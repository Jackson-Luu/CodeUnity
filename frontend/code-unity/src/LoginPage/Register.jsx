import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { authenticationService } from '@/_services';

class Register extends React.Component {
    constructor(props) {
        super(props);
    }

    change(e) {
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <div className="container mt-5" style={{ 'width': '700px' }}>
                    <div className="d-flex card-body bg-light flex-column shadow">
                        <h2 className="card-title text-muted p-1 mb-4"> Sign Up </h2>

                        <Formik
                            initialValues={{
                                email: '',
                                username: '',
                                password: ''
                            }}
                            validationSchema={Yup.object().shape({
                                email: Yup.string().required('Email is required'),
                                username: Yup.string().required('Username is required'),
                                password: Yup.string().required('Password is required')
                            })}
                            onSubmit={({ email, username, password }, { setStatus, setSubmitting }) => {
                                setStatus();
                                authenticationService.register(email, username, password)
                                    .then(
                                        user => {
                                            const { from } = this.props.location.state || { from: { pathname: "/" } };
                                            this.props.history.push(from);
                                        },
                                        error => {
                                            setSubmitting(false);
                                            setStatus(error);
                                        }
                                    );
                            }}
                            render={({ errors, status, touched, isSubmitting }) => (
                                <Form>
                                    {status &&
                                        <div className="alert alert-danger alert-dismissible fade show">
                                            <button type="button" className="close" data-dismiss="alert">&times;</button>
                                            {status}
                                        </div>
                                    }
                                    <div className="form-group">
                                        <label htmlFor="username" className="input-group-text text-muted bg-transparent border-0">Email</label>
                                        <div className="form-group input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text border-0 bg-transparent"> <i className="fa fa-envelope"></i> </span>
                                            </div>
                                            {/* <input type="email" id="email" className="form-control bg-dark rounded py-2" placeholder="Enter Email" style={{ 'color': 'white' }} required></input> */}
                                            <Field name="email" type="email" id="email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} placeholder="Enter Email" />
                                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="username" className="input-group-text text-muted bg-transparent border-0">Username</label>
                                        <div className="form-group input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text border-0 bg-transparent"> <i className="fa fa-user"></i> </span>
                                            </div>
                                            {/* <input type="text" id="username" className="form-control bg-dark rounded py-2" placeholder="Enter Username" style={{ 'color': 'white' }} required></input> */}
                                            <Field name="username" type="text" id="username" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} placeholder="Enter Username" />
                                            <ErrorMessage name="username" component="div" className="invalid-feedback" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password" className="input-group-text text-muted bg-transparent border-0">Password</label>
                                        <div className="form-group input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text border-0 bg-transparent"> <i className="fa fa-lock"></i> </span>
                                            </div>
                                            {/* <input type="password" id="password" className="form-control bg-dark rounded py-2" placeholder="Enter Password" style={{ 'color': 'white' }} required></input> */}
                                            <Field name="password" type="password" id="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} placeholder="Enter Password" />
                                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between form-group mt-5">
                                        <Link to="/login">Back</Link>
                                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Sign Up</button>
                                    </div>
                                </Form>
                            )}
                        />
                    </div>
                </div>
            </div >

        )
    }
}

export { Register };