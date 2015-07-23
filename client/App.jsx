// App component - represents the whole app
App = React.createClass({
    // This mixin makes the getMeteorData method work
    mixins: [ReactMeteorData],

    getInitialState(){
        return{
            hideCompleted:false
        }
    },
    // Loads items from the Tasks collection and puts them on this.data.tasks
    getMeteorData() {
        let query = {}
        if(this.state.hideCompleted)
            query = {checked:{$ne:true}}
        Meteor.subscribe("tasks");
        return {
            tasks: Tasks.find(query,{sort:{createdAt:-1}}).fetch(),
            incompleteCount:Tasks.find({checked:{$ne:true}}).count(),
            currentUser: Meteor.user()
        }
    },

    renderTasks() {
        // Get tasks from this.data.tasks
        return this.data.tasks.map((task) => {
            const currentUserId = this.data.currentUser && this.data.currentUser._id
            const showPrivateButton = task.owner === currentUserId
            return <Task key={task._id} task={task} showPrivateButton={showPrivateButton} />;
        });
    },
    handleSubmit(event){
        event.preventDefault();
        var text = React.findDOMNode(this.refs.textInput).value.trim();
        Meteor.call('addTask',text,(error,number)=>{
            console.log(error)
        })
        React.findDOMNode(this.refs.textInput).value = "";
    },
    toggleHideCompleted(){
        this.setState({
            hideCompleted:!this.state.hideCompleted
        })
    },
    render() {
        return (
            <div className="container">
                <header>
                    <h1>Todo List{this.data.incompleteCount}</h1>
                    <label className="hide-completed">
                        <input type="checkbox" readOnly={true} checked={this.state.hideCompleted} onClick={this.toggleHideCompleted}/>
                        隐藏已经完成的任务
                    </label>
                    <AccountsUIWrapper />
                    {this.data.currentUser?
                        <form className="new-task" onSubmit={this.handleSubmit} >
                            <input
                                type="text"
                                ref="textInput"
                                placeholder="Type to add new tasks" />
                        </form>
                        :''
                    }
                </header>

                <ul>
                    {this.renderTasks()}
                </ul>
            </div>
        );
    }
});