import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import '@/Style';
import { SkillBox, GroupCard } from '@/WebComponents';
import { userService, authenticationService } from '@/_services';
import { projectService } from '../_services';

class GroupPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.isMember = this.isMember.bind(this);
        this.state = {
            _id: '',
            details: {},
            description: '',
            applied: false,
            isLoading: true
        }
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        const { _id } = this.props.location.state;
        userService.getProjectDetail(_id).then(data => {
            this.setState({
                _id: _id,
                details: data,
                isLoading: false,
            })
        }).then(this.isMember())
            .catch(err => {
                this.setState({
                    isLoading: false
                })
            });
        /*
        projectService.join_requests().then(requests => {
            this.setState({
                applied: true
            })
        })*/
    }

    isMember() {
        console.log(this.state.details.members);
        for (var i in this.state.details.members) {
            if (this.state.details.members[i]._id == authenticationService.currentUserValue.uid) {
                this.setState({
                    applied: true
                });
                break;
            }
        }
    }


    handleChange(event) {
        this.setState({ description: event.target.value });
    }

    handleSubmit() {
        projectService.join_group(this.state._id, this.state.description)
            .then(
                user => {
                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                    this.props.history.push(from);
                }
            );
        this.setState({ applied: true });
    }

    render() {
        let key_id = 0;
        let leader = this.state.details.leader;
        return (
            <div className="container">
                <div className="row mt-1">
                    <div className="col-sm-9 pl-1">
                        <div className="my-3 p-3 bg-white rounded shadow-sm">
                            <div className="container pl-4">
                                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                    <h4 className="h1">{this.state.details.title}</h4>
                                    <div className="btn-toolbar mb-2 mb-md-0">
                                        <div className="btn-group mr-2">
                                            {!this.state.applied && <button type="button" className="btn btn-sm btn-outline-secondary" data-toggle="modal" data-target="#joinForm">Join Group</button>}
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-4 border-bottom border-grey">
                                    <div className="col-9">
                                        <div className="row">
                                            <p>Leader:&nbsp;</p>
                                            {!this.state.isLoading && <p><Link to={{ pathname: "/profile-" + leader.username, state: { _id: leader._id, username: leader.username } }} id={leader._id} style={{ 'textDecoration': 'none' }}>{leader.username}</Link></p>}
                                        </div>
                                        <div className="row">
                                            <p>Members:&nbsp;</p>
                                            {!this.state.isLoading && <p>
                                                {
                                                    this.state.details.members.filter((member) => { return member.username !== leader.username }).map((member, index) => {
                                                        return (
                                                            <span key={member._id}>
                                                                <Link to={{ pathname: "/profile-" + member.username, state: { _id: member._id, username: member.username } }} id={member._id} style={{ 'textDecoration': 'none' }}>{member.username}</Link>
                                                                {index !== this.state.details.members.length - 2 && <span>,&nbsp;</span>}
                                                            </span>
                                                        )
                                                    })
                                                }
                                            </p>}
                                        </div>
                                    </div>
                                    <div className="col-3 group-page-member-setting text-left">
                                        <div className="row">
                                            <p className="d-block text-gray-dark"> Member number:</p>
                                            <p className="d-block text-gray-dark">{this.state.details.cur_people}</p>
                                        </div>
                                        <div className="row">
                                            <p className="d-block text-gray-dark">max: </p>
                                            <p className="d-block text-gray-dark">{this.state.details.max_people}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mt-4 border-bottom border-grey">
                                    <div className="col-12">
                                        <h6 className="row h6">About This Group</h6>
                                        <p className="row pt-2">{this.state.details.description}</p>
                                    </div>
                                </div>
                                {this.state.details.course &&
                                    <div className="row mt-3 border-bottom border-grey">
                                        <div className="col-12 row">
                                            <p>Courses:</p>
                                            <p>{this.state.details.course}</p>
                                        </div>
                                    </div>
                                }
                                <div className="row container pt-3 pl-0">
                                    <SkillBox keyValue={key_id++} title="technologies" data={( this.state.details.technologies)} />
                                    <SkillBox keyValue={key_id++} title="languages" data={( this.state.details.languages)} />
                                    <SkillBox keyValue={key_id++} title="tags" data={( this.state.details.tags)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Create group modal */}
                <div className="modal fade" id="joinForm" tabIndex="-1" role="dialog" aria-labelledby="joinFormTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="joinFormTitle">Join Group</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <Form>
                                    <div className="form-group">
                                        <label htmlFor="title" className="pb-2 mb-0">Application Message:</label>
                                        <div className="form-group input-group">
                                            <textarea name="description" value={this.state.description} onChange={this.handleChange} type="text" id="description" rows="4" className={'form-control'} placeholder="Write a message" />
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="submit" className="btn btn-primary" onClick={() => { this.handleSubmit() }} data-dismiss="modal">Submit</button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div> {/* Create group modal end */}
            </div>
        );
    }

}

export { GroupPage };