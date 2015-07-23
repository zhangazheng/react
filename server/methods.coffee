Meteor.methods
  addTask:(text)->
    if !Meteor.userId()
      throw new Meteor.Error('没有登录')
    Tasks.insert(
      text:text
      createdAt:new Date()
      owner:Meteor.userId()
      username:Meteor.user().username
    )
  removeTask:(id)->
    if Tasks.findOne(id)?.owner is not Meteor.userId()
      throw new Meteor.Error('权限不足')
    Tasks.remove(id)
  setChecked:(id,setChecked)->
    if Tasks.findOne(id)?.owner is not Meteor.userId()
      throw new Meteor.Error('权限不足')
    Tasks.update(id,{$set:{checked:setChecked}})
  setPrivate:(id,setToPrivate)->
    console.log Tasks.findOne(id)
    if Tasks.findOne(id)?.owner is not Meteor.userId()
      throw new Meteor.Error('权限不足')
    Tasks.update(id,{$set:{private:setToPrivate}})