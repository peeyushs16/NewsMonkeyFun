import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl, author, date, source} = this.props;
    return (
        <div className="my-3">
            <div className="card" >
              <div style={{display:'flex', justifyContent : 'flex-end',position:'absolute', right:0}}>
              <span className="badge rounded-pill bg-danger" style={{left:'90%', zIndex:'1'}}>
                {source}
              </span>

              </div>
            
            
                <img src={imageUrl!==null?imageUrl:'https://www.reuters.com/resizer/1YL1QosJV7aMIy3XMuhIkw9Swiw=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/H3N3P4SFWFJ7RHTPHHS7TK6S3I.jpg'} className="card-img-top" alt="..." />
                <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-body-secondary">By {author} at {new Date(date).toGMTString()}</small></p>
                <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-sm btn-dark">Read more</a>
                </div>
            </div>
      </div>
    )
  }
}

export default NewsItem