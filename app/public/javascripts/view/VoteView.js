var VoteView = Backbone.View.extend ({
  events: {
    "click #btnVote": "on_vote"
  }

  ,on_vote: function() {
    i_vote();

    var saved_lunch_spots = DataStore.get_lunch_spots();
    saved_lunch_spots_view.display_lunch_spots(saved_lunch_spots);
  }

  ,get_lunch_spot: function() {
    var lunch_spot = $('#txtLunchSpot').val();
    return(lunch_spot);
  }

  ,get_message: function() {
    return ($('#txtMessage').val());
  }

}
)
