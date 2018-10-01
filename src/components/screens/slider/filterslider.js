import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';

export default class FilterSlider extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object
    };

    render () {
        const { data: { title, subtitle }, even } = this.props;


        return (
            <TouchableOpacity
              activeOpacity={1}
              
              //onPress={() => { alert(`You've clicked '${title}'`); }}
              >

                  <View style={{width: 100, borderColor: '#000', borderWidth: 1, padding: 10, borderRadius: 20}}>
                    <Text style={{color: '#fff', textAlign: 'center'}}>
                      Reset all
                    </Text>
                  </View>                  
                  <View style={{width: 100, borderColor: '#000', borderWidth: 1, padding: 10, borderRadius: 20}}>
                    <Text style={{color: '#fff', textAlign: 'center'}}>
                      Reset all
                    </Text>
                  </View>                  
                  <View style={{width: 100, borderColor: '#000', borderWidth: 1, padding: 10, borderRadius: 20}}>
                    <Text style={{color: '#fff', textAlign: 'center'}}>
                      Reset all
                    </Text>
                  </View>

            </TouchableOpacity>
        );
    }
}
