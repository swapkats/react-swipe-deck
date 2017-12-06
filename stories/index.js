import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Cards, { Card } from '../src/index'
import './style.css';

const data = ['Alexandre', 'Thomas', 'Lucien']

const CustomAlertLeft = () => <span>Nop</span>
const CustomAlertRight = () => <span>Ok</span>

storiesOf('Tinder card', module)
  .add('simple', () => (
    <div className="container">
      <h1>react swipe card</h1>
      <Cards onEnd={action('end')} className='master-root'>
        {data.map((item, key) =>
          <Card
            key={key}
            onSwipeLeft={action('swipe left')}
            onSwipeRight={action('swipe right')}>
            <div className="card">
              <h2>{item}</h2>
            </div>
          </Card>
        )}
      </Cards>
    </div>
  ))
  .add('custom alert', () => (
    <div>
      <h1>react swipe card</h1>
      <Cards
        alertRight={<CustomAlertRight />}
        alertLeft={<CustomAlertLeft />}
        onEnd={action('end')}
        className='master-root'>
        {data.map((item, key) =>
          <Card
              key={key}
              onSwipeLeft={action('swipe left')}
              onSwipeRight={action('swipe right')}>
            <div className="card">
              <h2>{item}</h2>
            </div>
          </Card>
        )}
      </Cards>
    </div>
  ))
  .add('all swipe directions', () => (
    <div>
      <h1>react swipe card</h1>
      <Cards onEnd={action('end')} className='master-root'>
        {data.map((item, key) =>
          <Card
            key={key}
            onSwipeTop={action('swipe top')}
            onSwipeBottom={action('swipe bottom')}
            onSwipeLeft={action('swipe left')}
            onSwipeRight={action('swipe right')}>
            <FancyCard name={item} />
          </Card>
        )}
      </Cards>
    </div>
  ))


const FancyCard = props => (
  <div className="card" style={{backgroundColor: props.swipeDirection === 'left' ? 'red' : props.swipeDirection === 'right' ? 'green' : 'white'}}>
    <h2>{props.name}</h2>
  </div>
)
