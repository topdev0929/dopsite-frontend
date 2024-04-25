import React from 'react';
import { Link } from 'react-router-dom';
import MetaTags from 'react-meta-tags';

//import images
import logo from '../../assets/images/logo-sm-full.png'
import flowIcon from "../../assets/images/home/flowIcon.png";
import * as ST from './styles'

const PageMaintenance = props => {
  return (
    <ST.Wrapper>
      <MetaTags>
        <title>Home | DOP Test Network</title>
      </MetaTags>
      <header>
        <div className='containerFix'>
          <div className='row'>
            <div className='col-md-4 logoSection'>
              <Link to="/dashboard" className="">
                <img src={logo} alt='' />
              </Link>
            </div>
            <div className='col-md-8 linkSection'>
              <Link to="/homepage" className="">
                <span>Home</span>
              </Link>
              <Link to="/about" className="">
                <span>About</span>
              </Link>
              <Link to="/contact" className="">
                <span>Contact</span>
              </Link>
              <Link to="/login" className="">
                <span>Login</span>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <section>
        <div className='polygon'></div>
        <div className='containerFix'>
          <nav>
            <div>
              DOP Test Network is your
            </div>
            <div className='dividerLeft'></div>
            <div className='dividerRight'></div>
            <div>
              All-in-one DOP testing, certificate printing, reporting &<br /> invoicing platform that you need.
            </div>
          </nav>
          <aside>
            <div className='row'>
              <div className='col-md-6 leftSection'>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='widget'>
                      <div className='title'>1</div>
                      <div>
                        Our customized workflow allows your staff to create clients and projects from the office, apply the client to the project, and fill in only the unique fileds on the labels, while automatically filling all other fields from the project and customer information you put it once.
                      </div>
                    </div>
                    <div className='widget'>
                      <div className='title'>2</div>
                      <div>
                        Once all the machines are tested, the system generates labels for you to print right there in the field. 
                      </div>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='widget'>
                        <div className='title'>3</div>
                        <div>
                          When you close the job, the invoice and reports are generated automatically and can be sent to the client for a fast turn around. Or, you can run a card right there on site, getting you paid before the technician even leaves the job-site.
                        </div>
                      </div>
                  </div>
                </div>
              </div>
              <div className='col-md-6'>
                <div className='rightSection'>
                  <div className='row'>
                    <div className='col-md-4'>
                      <img src={flowIcon} alt='' />
                    </div>
                    <div className='col-md-4'>
                      <img src={flowIcon} alt='' />
                    </div>
                    <div className='col-md-4'>
                      <img src={flowIcon} alt='' />
                    </div>
                  </div>
                  <div className='content'>
                    Get rid of poorly penned hand written labels that are time intensive and require duplicate entry.
                  </div>
                  <div className='title'>Streamline your DOP Testing Today!</div>
                  <div>
                    <Link to = "/register">
                      <span>Sign Up</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </ST.Wrapper>
  )
}

export default PageMaintenance;