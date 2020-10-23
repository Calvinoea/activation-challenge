import React from 'react';

export default class DataList extends React.Component {

        state = {
            proto: []
        }

        componentDidMount() {
            axios.get(`https://api.thegraph.com/subgraphs/name/aave/protocol`)
                .then(res => {
                    console.log(res);
                    this.setState({ proto: res.data });
                });
        }

        render() {
            return <ul > {
                this.state.proto.map(proto => < li > { proto.name } < /li>)} < /
                    ul > ;
                }
            }
        }