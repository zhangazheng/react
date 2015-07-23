AccountsUIWrapper = React.createClass({
    componentDidMount(){
        this.view = Blaze.render(Template.loginButtons,
            React.findDOMNode(this.refs.container)
        )
    },
    componentWillUnMount(){
        Blaze.remove(this.view);
    },
    render(){
        return <span ref="container"></span>
    }
})