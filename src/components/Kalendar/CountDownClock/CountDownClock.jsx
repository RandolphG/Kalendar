import React, { useEffect } from 'react';
import $ from 'jquery';
import './style.css';

const CountDownClock = () => {
  useEffect(() => {
    setInterval(function () {
      secondPlay();
    }, 1000);

    setInterval(function () {
      minutePlay();
    }, 10000);

    function secondPlay() {
      $('body').removeClass('play');
      var aa = $('ul.secondPlay li.active');

      if (aa.html() === undefined) {
        aa = $('ul.secondPlay li').eq(0);
        aa.addClass('before')
          .removeClass('active')
          .next('li')
          .addClass('active')
          .closest('body')
          .addClass('play');
      } else if (aa.is(':last-child')) {
        $('ul.secondPlay li').removeClass('before');
        aa.addClass('before').removeClass('active');
        aa = $('ul.secondPlay li').eq(0);
        aa.addClass('active').closest('body').addClass('play');
      } else {
        $('ul.secondPlay li').removeClass('before');
        aa.addClass('before')
          .removeClass('active')
          .next('li')
          .addClass('active')
          .closest('body')
          .addClass('play');
      }
    }

    function minutePlay() {
      $('body').removeClass('play');
      var aa = $('ul.minutePlay li.active');

      if (aa.html() === undefined) {
        aa = $('ul.minutePlay li').eq(0);
        aa.addClass('before')
          .removeClass('active')
          .next('li')
          .addClass('active')
          .closest('body')
          .addClass('play');
      } else if (aa.is(':last-child')) {
        $('ul.minutePlay li').removeClass('before');
        aa.addClass('before').removeClass('active');
        aa = $('ul.minutePlay li').eq(0);
        aa.addClass('active').closest('body').addClass('play');
      } else {
        $('ul.minutePlay li').removeClass('before');
        aa.addClass('before')
          .removeClass('active')
          .next('li')
          .addClass('active')
          .closest('body')
          .addClass('play');
      }
    }
  });

  return (
    <div>
      <div className="container">
        <ul className="flip minutePlay">
          <li>
            <a href="#">
              <div className="up">
                <div className="shadow" />
                <div className="inn">0</div>
              </div>
              <div className="down">
                <div className="shadow" />
                <div className="inn">0</div>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div className="up">
                <div className="shadow" />
                <div className="inn">1</div>
              </div>
              <div className="down">
                <div className="shadow" />
                <div className="inn">1</div>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div className="up">
                <div className="shadow" />
                <div className="inn">2</div>
              </div>
              <div className="down">
                <div className="shadow" />
                <div className="inn">2</div>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div className="up">
                <div className="shadow" />
                <div className="inn">3</div>
              </div>
              <div className="down">
                <div className="shadow" />
                <div className="inn">3</div>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div className="up">
                <div className="shadow" />
                <div className="inn">4</div>
              </div>
              <div className="down">
                <div className="shadow" />
                <div className="inn">4</div>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div className="up">
                <div className="shadow" />
                <div className="inn">5</div>
              </div>
              <div className="down">
                <div className="shadow" />
                <div className="inn">5</div>
              </div>
            </a>
          </li>
        </ul>
        <ul className="flip secondPlay">
          <li>
            <a href="#">
              <div className="up">
                <div className="shadow" />
                <div className="inn">0</div>
              </div>
              <div className="down">
                <div className="shadow" />
                <div className="inn">0</div>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div className="up">
                <div className="shadow" />
                <div className="inn">1</div>
              </div>
              <div className="down">
                <div className="shadow" />
                <div className="inn">1</div>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div className="up">
                <div className="shadow" />
                <div className="inn">2</div>
              </div>
              <div className="down">
                <div className="shadow" />
                <div className="inn">2</div>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div className="up">
                <div className="shadow" />
                <div className="inn">3</div>
              </div>
              <div className="down">
                <div className="shadow" />
                <div className="inn">3</div>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div className="up">
                <div className="shadow" />
                <div className="inn">4</div>
              </div>
              <div className="down">
                <div className="shadow" />
                <div className="inn">4</div>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div className="up">
                <div className="shadow" />
                <div className="inn">5</div>
              </div>
              <div className="down">
                <div className="shadow" />
                <div className="inn">5</div>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div className="up">
                <div className="shadow" />
                <div className="inn">6</div>
              </div>
              <div className="down">
                <div className="shadow" />
                <div className="inn">6</div>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div className="up">
                <div className="shadow" />
                <div className="inn">7</div>
              </div>
              <div className="down">
                <div className="shadow" />
                <div className="inn">7</div>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div className="up">
                <div className="shadow" />
                <div className="inn">8</div>
              </div>
              <div className="down">
                <div className="shadow" />
                <div className="inn">8</div>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div className="up">
                <div className="shadow" />
                <div className="inn">9</div>
              </div>
              <div className="down">
                <div className="shadow" />
                <div className="inn">9</div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CountDownClock;
