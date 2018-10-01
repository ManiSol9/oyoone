import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles from './SliderEntry.style';


import { LineChart, XAxis, YAxis, Grid, BarChart } from 'react-native-svg-charts'
import { Text } from 'react-native-svg'


export default class GraphSlider extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object
    };

    render () {


        const { data: { week } } = this.props;

        const workout_details = [{
                      values: [1, 2, 3, 4],
                      fillColor: 'rgb(134, 65, 244)',
                      strokeColor: 'rgb(134, 65, 244)',
                      strokeColorNegative: 'rgb(134, 65, 244)',
                      fillColorNegative:'rgb(134, 65, 244)'
                     }]

        const workout_details1 = [{
                      values: week,
                      fillColor: 'rgb(134, 65, 244)',
                      strokeColor: 'rgb(134, 65, 244)',
                      strokeColorNegative: 'rgb(134, 65, 244)',
                      fillColorNegative:'rgb(134, 65, 244)'
                     }]


        const values =  ['WEEK1', 'WEEK2', 'WEEK3', 'WEEK4', 'WEEK5']

        const days = []

        const fill = 'rgb(134, 65, 244)'

        const contentInset = { top: 50, bottom: -40 }

        return (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.slideInnerContainer}
              //onPress={() => { alert(`You've clicked '${title}'`); }}
              >
                <View style={[styles.imageContainer, styles.imageContainerEven]}>


            <View style={{ height: 200, padding: 20, flexDirection: 'row' }}>
                <YAxis
                    dataPoints={ days }
                    contentInset={ contentInset }
                    svg={{
                        fill: 'white',
                        fontSize: 10,
                        color: 'white'
                    }}
                    numberOfTicks={ 7 }
                    formatLabel={ value => value }
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                <BarChart
                    style={{ height: 200 }}
                    data={ workout_details1 }
                    fill={{fill}}
                    contentInset={{ top: 30, bottom: 30 }}
                    gridMin={0}
                >
                </BarChart>
                <XAxis
                    style={{ marginHorizontal: -10 }}
                    values={ values }
                    formatLabel={ (value, index) => value }
                    contentInset={{ left: 40, right: 40 }}
                    svg={{ fontSize: 10, fill: 'black' }}
                />
                </View>
            </View>



            </View>



            </TouchableOpacity>
        );
    }
}
