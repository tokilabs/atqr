Events emitted by:
  Goal Aggregate root (depends on Challenge Repository):

    - GoalCreated! (goal: Goal)
    - ChargeAuthorized! (owner: Contact, pledge: number, ownerPaymentMethod: PaymentMethod )
    - ChallengeCreated! (params?)

  Challenge Aggregate root (depends on Payment Service):

    - FundsAvailable! :challengeId :paymentMethod
    - FundsDenied! :challengeId
    - ChallengeCanceled!
    - ChallengeGotANewInvitee! :challenge, invitee: Invitee
    - ContenderRemovedJudge! :judgeEmail

    User entity:
      - UserCreated! :user
    
    PaymentMethod entity:
      - 📧 CardCharged! :auth :amountInCents ?
      - CardChargeFailed! :auth :amountInCents

  DeadlineMonitor service (Depends on ChallengesService)
    - DeadlineReached! :challengeId
    - ReminderToPlay! :challengeId :list
    - LastChanceToPlay! :challengeId :list
    - YourContenderIgnoredTheChallenge! :challenge
    - YourOfficiationRequestHaveBeenIgnored! :challenge
    - TimeToOfficiateArrived! :challenge
    - YourJudgeDidNotAnswered! :challengeId :list
    - ChallengeFailed! :challenge

  Notification service (depends on EmailService
    and ChallengeRepository)
    - EmailSent! :notification
    - ChallengeAccepted!
    - JudgeRequested!
    - JudgeForgotToPlay!
    - OfficiationRequested!
    - OfficiationRequestAccepted!
    - LastChanceToOfficiateArrived!
    - ContenderParticipationRequested!
    - ContenderRejectedTheChallenge!
    - ContenderIgnoredTheChallenge!
    - ContenderForgotToPlay!
    - OfficiationRequestAccepted! :challengeId :judgeId
    - YourJudgeRequestHaveBeenRejected! :challengeId :judgeId
    - ChallengeAccomplished!
    - ChallengeFailed!
   
    