Events emitted by:
  Goal Aggregate root (depends on Challenge Repository):

    - GoalCreated! (goal: Goal)
    - ChargeAuthorized! (owner: Contact, pledge: number, ownerPaymentMethod: PaymentMethod )
    - ChallengeCreated! (params?)

  Challenge Aggregate root (depends on Payment Service):

    - ChallengeAccepted!
    - OfficiationRequestAccepted!
    - FundsAvailable! :challengeId :paymentMethod
    - FundsDenied! :challengeId
    - ChallengeAccepted!
    - ContenderRejectedTheChallenge!
    - ChallengeCanceled!
    - ChallengeGotANewInvitee! :challenge, invitee: Invitee
    - ContenderRemovedJudge! :judgeEmail
    - OfficiationRequestAccepted! :challengeId :judgeId
    - YourJudgeRequestHaveBeenRejected! :challengeId :judgeId
    - ChallengeAccomplished!
    - ChallengeFailed!
    - ContenderParticipationRequested!
    - JudgeRequested!
    - OfficiationRequested!

    User entity:
      - UserCreated! :user
    
    PaymentMethod entity:
      - 📧 CardCharged! :auth :amountInCents ?
      - CardChargeFailed! :auth :amountInCents

  DeadlineMonitor service (Depends on ChallengesService)
    - 
