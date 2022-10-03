import React, { Component } from 'react'

export default class Newsitem extends Component {

  render() {


    let { title, description, imageUrl, newsUrl, author, date } = this.props; //destructuring is happening here

    return (
      <div className="card my-3 container p-0" style={{ width: "22em", minHeight: "20em" }} >
        <img src={imageUrl} style={{ height: "12em" }} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text"><small className="text-muted">By {author ? author : "unknown"} on {new Date(date).toGMTString()}</small></p>
          <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-primary">Read More</a>
        </div>
      </div>
    )
  }
}
