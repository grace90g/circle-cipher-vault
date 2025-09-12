// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract CircleCipherVault is SepoliaConfig {
    using FHE for *;
    
    struct LendingCircle {
        euint32 circleId;
        euint32 totalMembers;
        euint32 currentMembers;
        euint32 contributionAmount;
        euint32 totalPool;
        euint32 currentRound;
        euint32 maxRounds;
        bool isActive;
        bool isVerified;
        string name;
        string description;
        address creator;
        uint256 startTime;
        uint256 endTime;
        mapping(uint256 => address) members;
        mapping(address => euint32) memberContributions;
        mapping(uint256 => address) roundWinners;
    }
    
    struct Member {
        euint32 memberId;
        euint32 contributionAmount;
        euint32 totalContributed;
        euint32 roundsParticipated;
        bool isActive;
        bool hasReceivedFunds;
        address walletAddress;
        uint256 joinTime;
    }
    
    struct Round {
        euint32 roundId;
        euint32 totalContributions;
        address winner;
        bool isCompleted;
        uint256 endTime;
        mapping(address => euint32) roundContributions;
    }
    
    mapping(uint256 => LendingCircle) public lendingCircles;
    mapping(address => Member) public members;
    mapping(uint256 => Round) public rounds;
    mapping(address => euint32) public memberReputation;
    mapping(address => euint32) public circleReputation;
    
    uint256 public circleCounter;
    uint256 public memberCounter;
    uint256 public roundCounter;
    
    address public owner;
    address public verifier;
    
    event CircleCreated(uint256 indexed circleId, address indexed creator, string name);
    event MemberJoined(uint256 indexed circleId, address indexed member, uint32 contributionAmount);
    event RoundCompleted(uint256 indexed circleId, uint256 indexed roundId, address indexed winner);
    event FundsDistributed(uint256 indexed circleId, address indexed recipient, uint32 amount);
    event CircleVerified(uint256 indexed circleId, bool isVerified);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    function createLendingCircle(
        string memory _name,
        string memory _description,
        uint256 _totalMembers,
        uint256 _contributionAmount,
        uint256 _duration
    ) public returns (uint256) {
        require(bytes(_name).length > 0, "Circle name cannot be empty");
        require(_totalMembers > 1, "Circle must have at least 2 members");
        require(_contributionAmount > 0, "Contribution amount must be positive");
        require(_duration > 0, "Duration must be positive");
        
        uint256 circleId = circleCounter++;
        
        LendingCircle storage circle = lendingCircles[circleId];
        circle.circleId = FHE.asEuint32(0); // Will be set properly later
        circle.totalMembers = FHE.asEuint32(0); // Will be set to actual value via FHE operations
        circle.currentMembers = FHE.asEuint32(0);
        circle.contributionAmount = FHE.asEuint32(0); // Will be set to actual value via FHE operations
        circle.totalPool = FHE.asEuint32(0);
        circle.currentRound = FHE.asEuint32(0);
        circle.maxRounds = FHE.asEuint32(0); // Will be set to actual value via FHE operations
        circle.isActive = true;
        circle.isVerified = false;
        circle.name = _name;
        circle.description = _description;
        circle.creator = msg.sender;
        circle.startTime = block.timestamp;
        circle.endTime = block.timestamp + _duration;
        
        // Add creator as first member
        circle.members[0] = msg.sender;
        circle.currentMembers = FHE.add(circle.currentMembers, FHE.asEuint32(1));
        
        emit CircleCreated(circleId, msg.sender, _name);
        return circleId;
    }
    
    function joinLendingCircle(
        uint256 circleId,
        externalEuint32 contributionAmount,
        bytes calldata inputProof
    ) public payable returns (bool) {
        require(lendingCircles[circleId].creator != address(0), "Circle does not exist");
        require(lendingCircles[circleId].isActive, "Circle is not active");
        require(block.timestamp <= lendingCircles[circleId].endTime, "Circle has ended");
        
        // Check if member already exists
        bool isAlreadyMember = false;
        for (uint256 i = 0; i < 10; i++) { // Assuming max 10 members for gas optimization
            if (lendingCircles[circleId].members[i] == msg.sender) {
                isAlreadyMember = true;
                break;
            }
        }
        require(!isAlreadyMember, "Already a member of this circle");
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalAmount = FHE.fromExternal(contributionAmount, inputProof);
        
        // Add member to circle
        uint256 memberIndex = uint256(FHE.decrypt(lendingCircles[circleId].currentMembers));
        lendingCircles[circleId].members[memberIndex] = msg.sender;
        lendingCircles[circleId].memberContributions[msg.sender] = internalAmount;
        lendingCircles[circleId].currentMembers = FHE.add(lendingCircles[circleId].currentMembers, FHE.asEuint32(1));
        lendingCircles[circleId].totalPool = FHE.add(lendingCircles[circleId].totalPool, internalAmount);
        
        emit MemberJoined(circleId, msg.sender, 0); // Amount will be decrypted off-chain
        return true;
    }
    
    function contributeToRound(
        uint256 circleId,
        uint256 roundId,
        externalEuint32 amount,
        bytes calldata inputProof
    ) public payable returns (bool) {
        require(lendingCircles[circleId].creator != address(0), "Circle does not exist");
        require(lendingCircles[circleId].isActive, "Circle is not active");
        require(!rounds[roundId].isCompleted, "Round is already completed");
        
        // Check if user is a member of the circle
        bool isMember = false;
        for (uint256 i = 0; i < 10; i++) {
            if (lendingCircles[circleId].members[i] == msg.sender) {
                isMember = true;
                break;
            }
        }
        require(isMember, "Not a member of this circle");
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        
        // Add contribution to round
        rounds[roundId].roundContributions[msg.sender] = internalAmount;
        rounds[roundId].totalContributions = FHE.add(rounds[roundId].totalContributions, internalAmount);
        
        return true;
    }
    
    function completeRound(
        uint256 circleId,
        uint256 roundId,
        address winner
    ) public returns (bool) {
        require(msg.sender == lendingCircles[circleId].creator, "Only circle creator can complete rounds");
        require(lendingCircles[circleId].isActive, "Circle is not active");
        require(!rounds[roundId].isCompleted, "Round is already completed");
        
        // Verify winner is a member
        bool isWinnerMember = false;
        for (uint256 i = 0; i < 10; i++) {
            if (lendingCircles[circleId].members[i] == winner) {
                isWinnerMember = true;
                break;
            }
        }
        require(isWinnerMember, "Winner must be a circle member");
        
        // Complete the round
        rounds[roundId].winner = winner;
        rounds[roundId].isCompleted = true;
        rounds[roundId].endTime = block.timestamp;
        
        // Update circle state
        lendingCircles[circleId].currentRound = FHE.add(lendingCircles[circleId].currentRound, FHE.asEuint32(1));
        lendingCircles[circleId].roundWinners[uint256(FHE.decrypt(lendingCircles[circleId].currentRound))] = winner;
        
        emit RoundCompleted(circleId, roundId, winner);
        return true;
    }
    
    function distributeFunds(
        uint256 circleId,
        uint256 roundId,
        address recipient
    ) public returns (bool) {
        require(msg.sender == lendingCircles[circleId].creator, "Only circle creator can distribute funds");
        require(rounds[roundId].isCompleted, "Round must be completed first");
        require(rounds[roundId].winner == recipient, "Recipient must be the round winner");
        
        // Calculate distribution amount (total pool / number of rounds)
        euint32 distributionAmount = FHE.div(lendingCircles[circleId].totalPool, lendingCircles[circleId].maxRounds);
        
        // Update member's total contributed amount
        lendingCircles[circleId].memberContributions[recipient] = FHE.add(
            lendingCircles[circleId].memberContributions[recipient],
            distributionAmount
        );
        
        emit FundsDistributed(circleId, recipient, 0); // Amount will be decrypted off-chain
        return true;
    }
    
    function verifyCircle(uint256 circleId, bool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify circles");
        require(lendingCircles[circleId].creator != address(0), "Circle does not exist");
        
        lendingCircles[circleId].isVerified = isVerified;
        emit CircleVerified(circleId, isVerified);
    }
    
    function updateReputation(address user, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        
        // Determine if user is member or circle creator based on context
        if (members[user].walletAddress == user) {
            memberReputation[user] = reputation;
        } else {
            circleReputation[user] = reputation;
        }
        
        emit ReputationUpdated(user, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getCircleInfo(uint256 circleId) public view returns (
        string memory name,
        string memory description,
        uint8 totalMembers,
        uint8 currentMembers,
        uint8 contributionAmount,
        uint8 totalPool,
        uint8 currentRound,
        uint8 maxRounds,
        bool isActive,
        bool isVerified,
        address creator,
        uint256 startTime,
        uint256 endTime
    ) {
        LendingCircle storage circle = lendingCircles[circleId];
        return (
            circle.name,
            circle.description,
            0, // FHE.decrypt(circle.totalMembers) - will be decrypted off-chain
            0, // FHE.decrypt(circle.currentMembers) - will be decrypted off-chain
            0, // FHE.decrypt(circle.contributionAmount) - will be decrypted off-chain
            0, // FHE.decrypt(circle.totalPool) - will be decrypted off-chain
            0, // FHE.decrypt(circle.currentRound) - will be decrypted off-chain
            0, // FHE.decrypt(circle.maxRounds) - will be decrypted off-chain
            circle.isActive,
            circle.isVerified,
            circle.creator,
            circle.startTime,
            circle.endTime
        );
    }
    
    function getMemberInfo(address member) public view returns (
        uint8 memberId,
        uint8 contributionAmount,
        uint8 totalContributed,
        uint8 roundsParticipated,
        bool isActive,
        bool hasReceivedFunds,
        address walletAddress,
        uint256 joinTime
    ) {
        Member storage memberData = members[member];
        return (
            0, // FHE.decrypt(memberData.memberId) - will be decrypted off-chain
            0, // FHE.decrypt(memberData.contributionAmount) - will be decrypted off-chain
            0, // FHE.decrypt(memberData.totalContributed) - will be decrypted off-chain
            0, // FHE.decrypt(memberData.roundsParticipated) - will be decrypted off-chain
            memberData.isActive,
            memberData.hasReceivedFunds,
            memberData.walletAddress,
            memberData.joinTime
        );
    }
    
    function getRoundInfo(uint256 roundId) public view returns (
        uint8 roundId_,
        uint8 totalContributions,
        address winner,
        bool isCompleted,
        uint256 endTime
    ) {
        Round storage round = rounds[roundId];
        return (
            0, // FHE.decrypt(round.roundId) - will be decrypted off-chain
            0, // FHE.decrypt(round.totalContributions) - will be decrypted off-chain
            round.winner,
            round.isCompleted,
            round.endTime
        );
    }
    
    function getMemberReputation(address member) public view returns (uint8) {
        return 0; // FHE.decrypt(memberReputation[member]) - will be decrypted off-chain
    }
    
    function getCircleReputation(address circleCreator) public view returns (uint8) {
        return 0; // FHE.decrypt(circleReputation[circleCreator]) - will be decrypted off-chain
    }
    
    function withdrawFunds(uint256 circleId) public {
        require(lendingCircles[circleId].creator == msg.sender, "Only circle creator can withdraw");
        require(lendingCircles[circleId].isVerified, "Circle must be verified");
        require(block.timestamp > lendingCircles[circleId].endTime, "Circle must be ended");
        
        // Transfer funds to creator
        // Note: In a real implementation, funds would be transferred based on decrypted amount
        lendingCircles[circleId].isActive = false;
        
        // For now, we'll transfer a placeholder amount
        // payable(msg.sender).transfer(amount);
    }
}
