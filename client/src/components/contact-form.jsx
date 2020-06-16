import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import emailjs from 'emailjs-com';

class ContactForm extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            name: "",
            email: "",
            message: "",
            sent: false
        }
    }


    handleSubmit = event => {
        event.preventDefault();
        
        emailjs.sendForm('default_service', 'contact_form', event.target, 'user_2853rwzQwOgtGRHnfnFJO')
        .then((result) => {
        console.log(result.text);
        }, (error) => {
        console.log(error.text);
        });

        this.resetForm()
      
    };

    resetForm() {
        this.setState({
          name: '',
          email: '',
          message: '',
          sent: true,
        })
      }
    
    handleChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value,
        });
    }

    render() {
        return(
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input 
                       type="text" 
                       name="name" 
                       id="name" 
                       placeholder="Name"
                       value={this.state.name}
                       onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input 
                       type="email" 
                       name="email" 
                       id="email" 
                       placeholder="Email address"
                       value={this.state.email}
                       onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="message">Message</Label>
                    <Input 
                       type="text" 
                       name="message" 
                       id="message" 
                       placeholder="Message"
                       value={this.state.message}
                       onChange={this.handleChange} />
                </FormGroup>
                <Button color="success">Submit</Button>
            </Form>
        )
    }
}


export default ContactForm;
