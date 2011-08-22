
describe("messaging", function() {
  it("MessageFactory.create('_wrong_') returns undefined", function() {
    var m = MessageFactory.create('string that MessageFactory does not understand');
    expect(m).toBeUndefined();
  });

  it("MessageFactory.create('mock') creates a mock messenger", function() {
    var m = MessageFactory.create('mock');
    expect(m.getName()).toEqual('MockSvc');
  });

  it("MessageFactory.create('pubnub') creates a pubnub messenger", function() {
    var m = MessageFactory.create('pubnub');
    expect(m.getName()).toEqual('PubnubSvc');
  });


});

describe("Vote Action", function() {
  it("i_vote() method calls message_svc.send_my_votes", function() {
    textbox_is_empty = jasmine.createSpy().andCallFake(function() {return(false); });
    set_cookie_for = jasmine.createSpy();
    jasmine.createSpy(RestaurantView, 'get_current_votes').andCallFake(function() {return(null);});

    huddle_name='foo';
    existing_votes = 'too';
    message_svc = MessageFactory.create('mock');
    spyOn(MockSvc, 'send_my_votes');
    i_vote();

    expect(MockSvc.send_my_votes).toHaveBeenCalled();

  });
});

describe("RestaurantView", function() {
  describe("get_current_votes", function() {
    it("when no restaurants have been voted, then returns an empty list", function() {
      expect(RestaurantView.get_current_votes().length).toEqual(0);
    });
  });

  describe("user_vote_exists", function() {
    it("returns 'true' when a user has an existing vote", function() {
      var existing_votes = [];
      expect(existing_votes).toEqual([]);

      var existing_vote = Object.beget(LunchSpot);
      existing_vote.user_display_name = 'old';
      existing_vote.user_id = 'old';
      existing_vote.lunch_spot = 'five guys';
      existing_votes.push(existing_vote);

      var new_vote = Object.beget(LunchSpot);
     new_vote.user_display_name = 'old';
      new_vote.user_id = 'old';
      new_vote.lunch_spot = 'chipotle';

      expect(RestaurantModel.user_vote_exists(new_vote, existing_votes)).toBeTruthy();
    });

    it("returns 'false' when a user does not have an existing vote", function() {
      var existing_votes = [];
      expect(existing_votes).toEqual([]);

      var existing_vote = Object.beget(LunchSpot);
      existing_vote.user_display_name = 'old';
      existing_vote.user_id = 'old';
      existing_vote.lunch_spot = 'five guys';
      existing_votes.push(existing_vote);

      var new_vote = Object.beget(LunchSpot);
      new_vote.user_display_name = 'new';
      new_vote.user_id = 'new';
      new_vote.lunch_spot = 'chipotle';

    });
  });

  describe("add_user_vote_to_current_votes", function() {

    it("user's first vote is added to list of voted-for restaurants", function() {
      var existing_votes = [];
      expect(existing_votes).toEqual([]);

      var existing_vote = Object.beget(LunchSpot);
      existing_vote.user_display_name = 'old';
      existing_vote.user_id = 'old';
      existing_vote.lunch_spot = 'five guys';
      existing_votes.push(existing_vote);

      var new_vote = Object.beget(LunchSpot);
      new_vote.user_display_name = 'new';
      new_vote.user_id = 'new';
      new_vote.lunch_spot = 'chipotle';

      RestaurantModel.add_vote(new_vote, existing_votes);

      expect(existing_votes.length).toEqual(2);
    });

    it("user's subsequent vote replaces his old vote on the voted-for list", function() {
      var existing_votes = [];
      expect(existing_votes).toEqual([]);

      var existing_vote = Object.beget(LunchSpot);
      existing_vote.user_display_name = 'old';
      existing_vote.user_id = 'old';
      existing_vote.lunch_spot = 'five guys';
      existing_votes.push(existing_vote);

      expect(existing_votes[0].lunch_spot).toEqual('five guys');

      var new_vote = Object.beget(LunchSpot);
      new_vote.user_display_name = 'old';
      new_vote.user_id = 'old';
      new_vote.lunch_spot = 'chipotle';

      RestaurantModel.add_vote(new_vote, existing_votes);

      expect(existing_votes.length).toEqual(1);
      expect(existing_votes[0].user_display_name).toEqual('old');
      expect(existing_votes[0].user_id).toEqual('old');
      expect(existing_votes[0].lunch_spot).toEqual('chipotle');
    });
  });

});

describe ("index_event_handlers", function() {
  it("merge_in_new_votes adds a new vote", function() {
    var existing_votes = [];
    var new_votes = [];
    var v1 = Object.beget(LunchSpot);
    v1.user_id = 'old';
    v1.lunch_spot = 'subway';
    existing_votes.push(v1);
    expect(existing_votes.length).toEqual(1);

    var new_votes = [];
    var v2 = Object.beget(LunchSpot);
    v2.user_id = 'new';
    v2.lunch_spot = 'five guys';
    new_votes.push(v2);

    merge_in_new_votes(new_votes, existing_votes);
    expect(existing_votes.length).toEqual(2);
  });
  it("merge_in_new_votes replaces an existing vote", function() {
    var existing_votes = [];
    var new_votes = [];
    var v1 = Object.beget(LunchSpot);
    v1.user_id = 'old';
    v1.lunch_spot = 'subway';
    existing_votes.push(v1);

    var v2 = Object.beget(LunchSpot);
    v2.user_id = 'new';
    v2.lunch_spot = 'five guys';
    existing_votes.push(v2);
    expect(existing_votes.length).toEqual(2);

    var new_votes = [];
    var v3 = Object.beget(LunchSpot);
    v3.user_id = 'new';
    v3.lunch_spot = 'hothead burrito';
    new_votes.push(v3);

    merge_in_new_votes(new_votes, existing_votes);
    expect(existing_votes.length).toEqual(2);
  });
});