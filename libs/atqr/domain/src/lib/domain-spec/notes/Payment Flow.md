# Payment Flow

## Statuses

- NotDueYet
- Defaulted
- Failed
- Forgiven
- Paid
- Pending
- Refunded
- RefundRequested

## Status Flow

<!--
TODO: Check if we should use Settled state after Paid + 30 days -->

```plantuml
@startuml
hide empty description
!theme sandstone
' Other: amiga, bluegray, cerulean, cerulean-outline, sandstone

' skinparam backgroundColor White
' skinparam state {
'   StartColor Black
'   EndColor Black
'   BackgroundColor White
'   BackgroundColor<<Warning>> Olive
'   ' BorderColor Gray
'   ' FontName Impact
' }

[*] --> NotDueYet
NotDueYet : Payment is only due
NotDueYet : if Contender fails the challenge


NotDueYet -d-> Forgiven : Contender Succeeded
NotDueYet -d-> Pending : Contender Failed

Pending -r-> Failed
Pending --> Paid

Paid -[dashed]-> RefundRequested
note top of RefundRequested
  Payment only moves to this
  state manually, upon email
  requesting refund from user
end note
RefundRequested --> Refunded

Failed --> Failed : tries++
Failed --> Defaulted : tries > 2

Defaulted --> [*]
Paid --> [*] : 30 days\n later
Forgiven --> [*]
Refunded --> [*]
@enduml
```
