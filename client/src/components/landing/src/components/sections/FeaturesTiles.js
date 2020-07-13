import React from 'react';
import classNames from 'classnames';
import { SectionTilesProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Image from '../elements/Image';

const propTypes = {
  ...SectionTilesProps.types
}

const defaultProps = {
  ...SectionTilesProps.defaults
}
const FeaturesTiles = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  pushLeft,
  ...props
}) => {

  const outerClasses = classNames(
    'features-tiles section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'features-tiles-inner section-inner pt-0',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const tilesClasses = classNames(
    'tiles-wrap center-content',
    pushLeft && 'push-left'
  );

  const sectionHeader = {
    title: 'Who are we?',
    paragraph: 'Eracost is a tutoring agency based in India. We have a team of experts, from all walks of education, whether it is a mid-tickling engineering problems, high end accounting and finance quizzes or creative humanities questions. With our esteems high, we will leave no stone unturned to help you reach the pinnacle of success.'
  };

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content text-white" />
          <div className={tilesClasses}>

            <div className="tiles-item reveal-from-bottom">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="features-tiles-item-image mb-16">
                    <Image
                      src={require('./../../assets/images/feature-tile-icon-01.svg')}
                      alt="Features tile icon 01"
                      width={64}
                      height={64} />
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">
                    100% plagiarism free work
                    </h4>
                  <p className="m-0 text-sm text-white" style={{ color: "#9ca9b3" }}>
                    We believe in originality and have stringent internal plagiarism laws.
                    Our mentors are experts in their respective field and possess enormous amount of latest knowledge. Moreover, our Quality Assurance team keeps a strict eye on every work and therefore, ensures no plagiarism in work

                    </p>
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-bottom" data-reveal-delay="200">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="features-tiles-item-image mb-16">
                    <Image
                      src={require('./../../assets/images/feature-tile-icon-02.svg')}
                      alt="Features tile icon 02"
                      width={64}
                      height={64} />
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">
                    Affordable prices
                    </h4>
                  <p className="m-0 text-sm text-white" style={{ color: "#9ca9b3" }}>
                    In this world, all the great things are expensive. However, Eracost don’t work on this principle. We believe in high quality and low cost. We are truly dedicated towards the student community and therefore, have kept competitive prices.
                    </p>
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-bottom" data-reveal-delay="400">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="features-tiles-item-image mb-16">
                    <Image
                      src={require('./../../assets/images/feature-tile-icon-03.svg')}
                      alt="Features tile icon 03"
                      width={64}
                      height={64} />
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">
                    24*7 Working Hours
                    </h4>
                  <p className="m-0 text-sm text-white" style={{ color: "#9ca9b3" }}>
                    Living in a different time-zone? No worries, Eracost have got you covered as well. Our experts work round the clock, to serve our clients with full satisfaction.
                    </p>
                </div>
              </div>
            </div>



            <div className="tiles-item reveal-from-bottom" data-reveal-delay="200">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="features-tiles-item-image mb-16">
                    <Image
                      src={require('./../../assets/images/feature-tile-icon-05.svg')}
                      alt="Features tile icon 05"
                      width={64}
                      height={64} />
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">
                    Satisfaction
                    </h4>
                  <p className="m-0 text-sm text-white" style={{ color: "#9ca9b3" }}>
                    Customer is the King and we possess the magic to content the King. We have a huge experience, in terms of diversity of work and clients served. We are fully dedicated and provide personalized mentorship to our each and every client. We provide you with a state-of-the-art personalized dashboard, to track all your tasks and receive expert advice on the same.
                    </p>
                </div>
              </div>
            </div>



          </div>
        </div>
      </div>
    </section>
  );
}

FeaturesTiles.propTypes = propTypes;
FeaturesTiles.defaultProps = defaultProps;

export default FeaturesTiles;