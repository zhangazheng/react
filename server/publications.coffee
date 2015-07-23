Meteor.publish 'tasks', ->
  Tasks.find(
    $or: [
      private: {$ne: true}
      owner: @userId
    ]
  )