import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';




Template.footer.events({
  "keypress input" : function(e){
    var inputTxt = $('.input-box_text').val();
    if(!!inputTxt) {
      if(e.keyCode == 13) {
        e.stopPropagation();
        Messages.insert({
            text: inputTxt,
            date: new Date(),
            user: Meteor.user() == null ? "Anonyme" : Meteor.user().username
          });
        $('.input-box_text').val("");
        return false;
      }
    }
  }
});

Template.messages.helpers({
  "messages": function() {
    return Messages.find();
  }
});


Template.message.helpers({
  formatDate: function(date) {
    var locale = window.navigator.userLanguage || window.navigator.language;
    moment.locale(locale);
    return moment(date).format('LLL');
  }
});


Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});
