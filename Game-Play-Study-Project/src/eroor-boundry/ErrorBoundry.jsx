import { Component } from "react";

export default class ErorrBoundry extends Component{

    constructor(props){
        super(props)

        this.state={
            hasErr:false,
            errMsg:''
        }
    }

    static getDerivedStateFromError(err){
        console.log('getDerivedStateFromError');

        return{
            hasErr:true,
            errMsg:err.message
            
        
        }
        
    }
    

    render(){
        if(this.state.hasErr){
            return (
                <>
            <h1 style={{color:'white'}}>Err Page!</h1>
            <p1>{this.state.errMsg}</p1>
            </>
        )}


        return this.props.children
    }
}