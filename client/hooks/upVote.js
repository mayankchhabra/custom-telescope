Template.post_vote.events({
  'click .upvote-arrow': function(e){
    var post = this;
    var user = Meteor.user();
    e.preventDefault();
    if(!user){
      alert("please sign in");
      //Messages.flash(i18n.t("please_log_in_first"), "info");
      return;
    }
    if (user.hasUpvoted(post)) {
      Meteor.call('cancelUpvotePost', post._id, function(){
        Events.track("post upvote cancelled", {'_id': post._id});
      });        
    } else {
      Meteor.call('upvotePost', post._id, function(){
        Events.track("post upvoted", {'_id': post._id});
      });  
    }
  },
  'click .downvote-arrow': function(e){
    var post = this;
    var user = Meteor.user();
    e.preventDefault();
    if(!user){
      FlowRouter.go('atSignIn');
      Messages.flash(i18n.t("please_log_in_first"), "info");
    }
    if (user.hasDownvoted(post)) {
      Meteor.call('cancelDownvotePost', post._id, function(){
        Events.track("post downvote cancelled", {'_id': post._id});
      });        
    } else {
      Meteor.call('downvotePost', post._id, function(){
        Events.track("post downvoted", {'_id': post._id});
      });  
    }
  }  
});