import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../App.css';
import { loadUsers } from '../actions/actions';
import Loader from 'react-loader-spinner';

class UsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cityName: '',
            isLoading: false,
            eventSet: null
        }
    }

    handleChange = (event) => {
        this.setState({
            cityName: event.target.value,
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ isLoading: true });
        this.props.loadUsers(this.state.cityName);
        this.setState({ isLoading: false });
    }

    render() {
        const { users } = this.props;
        const { cityName, isLoading } = this.state;

        return (
            <div className="App">
                <form className="App-header" >
                    <label>
                        Enter City Name:
                    <input type="text" value={cityName} onChange={this.handleChange} style={{ marginLeft: 10 }} />
                    </label>
                    <input type="submit" value="Submit" style={{ marginLeft: 10 }} onClick={this.handleSubmit} />
                </form>
                {isLoading && <div
                    style={{
                        width: "100%",
                        height: "100",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: '#282c34'
                    }}
                >
                    <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
                </div>}

                {!isLoading && users.map((item, index) => {
                    return (
                        <div style={{ backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }} className="centered">
                            <div key={index} style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }} className="borderDiv">
                                <img src={item.avatar_url} alt={'AVATAR'} className="image-element row" />
                                <div className='row'>
                                    <h5>{item.login}</h5>
                                    <h5>{item.id}</h5>
                                    <h5>{item.type}</h5>
                                </div>
                            </div>
                            <br />
                        </div>
                    )
                })}

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    };
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         loadUsers: loadUsers
//     }
// }

export default connect(mapStateToProps, { loadUsers })(UsersList);
