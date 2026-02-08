import Time "mo:core/Time";
import Runtime "mo:core/Runtime";

actor {
  type AcceptanceRecord = {
    timestamp : Time.Time;
    note : ?Text;
  };

  var acceptanceCount = 0;
  var latestRecord : ?AcceptanceRecord = null;

  public shared ({ caller }) func recordAcceptance(note : ?Text) : async () {
    acceptanceCount += 1;
    latestRecord := ?{
      timestamp = Time.now();
      note;
    };
  };

  public query ({ caller }) func getAcceptanceCount() : async Nat {
    acceptanceCount;
  };

  public query ({ caller }) func getLatestRecord() : async AcceptanceRecord {
    switch (latestRecord) {
      case (?record) { record };
      case (null) { Runtime.trap("No acceptance records found") };
    };
  };
};
