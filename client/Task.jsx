// Task component - represents a single todo item
Task = React.createClass({
    propTypes: {
        // This component gets the task to display through a React prop.
        // We can use propTypes to indicate it is required
        task: React.PropTypes.object.isRequired,
        showPrivateButton:React.PropTypes.bool.isRequired
    },
    toggleChecked(){
        Meteor.call('setChecked',this.props.task._id,!this.props.task.checked,(error,number)=>{
            console.log(error)
        })
    },
    togglePrivate(){
        Meteor.call('setPrivate',this.props.task._id,!this.props.task.private,(error,number)=>{
            console.log(error)
        })
    },
    deleteThisTask(){
        Meteor.call('removeTask',this.props.task._id,(error,number)=>{
            console.log(error)
        })
    },
    render() {
        const taskClassName = this.props.task.checked?"checked":"" +" "+ this.props.task.private?'private':'';
        return (
            <li className={taskClassName}>
                <button className="delete" onClick={this.deleteThisTask}>
                    &times;
                </button>
                <input type="checkbox" readOnly = {true} checked ={this.props.task.checked} onClick={this.toggleChecked}/>
                { this.props.showPrivateButton?
                    <button className='goggle-private' onClick={this.togglePrivate}>
                        {this.props.task.private?"private":'public'}
                    </button>
                    :''
                }
                <span className="text">
                    <strong>{this.props.task.username}</strong>: {this.props.task.text}
                </span>
            </li>
        );
    }
});