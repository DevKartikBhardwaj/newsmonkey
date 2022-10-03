import React, { Component } from 'react'
import loader from '../Preloader.gif'

export default class spinner extends Component {
    render() {
        return (
            <div className='text-center'>
                <img src={loader} height="200px" alt="./" />
            </div>
        )
    }
}
