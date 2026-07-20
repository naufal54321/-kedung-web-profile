import React from 'react';
import { getAllDevelopers } from '../../utils/developer';
import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';

class DeveloperCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      developers: [],
    };
  }

  componentDidMount() {
    const developers = getAllDevelopers();
    this.setState({ developers });
  }

  openSocialMedia(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  render() {
    return (
      <div className="container mb-4 d-flex flex-wrap gap-4 justify-content-center mx-auto">
        {this.state.developers.map((developer) => (
          <div key={developer.id} className="card border shadow developer-item" style={{ width: '20rem' }}>
            <div className="bg-secondary-green rounded-top p-3 position-relative mb-5" style={{ height: '100px' }}>
              <img className="card-img-top w-50 position-absolute top-100 start-50 translate-middle rounded-circle border-green" src={developer.imageUrl} alt={developer.name} />
            </div>
            <div className="card-body mt-5 d-flex flex-column justify-content-evenly align-items-center">
              <h5 className="card-title m-0">{developer.name}</h5>
              <p className="m-0">{developer.job}</p>
            </div>
            <div className="bg-primary-green d-flex justify-content-center rounded-bottom">
              <button className="btn text-white" onClick={() => this.openSocialMedia(developer.instagram)}>
                <FaInstagram />
              </button>
              <button className="btn text-white" onClick={() => this.openSocialMedia(developer.github)}>
                <FaGithub />
              </button>
              <button className="btn text-white" onClick={() => this.openSocialMedia(developer.linkedin)}>
                <FaLinkedin />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default DeveloperCard;
