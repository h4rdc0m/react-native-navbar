import React from 'react-native';
const {
  PixelRatio,
  Component,
  Text,
  View,
  PropTypes
} = React;
import NavbarButton from './NavbarButton';
import styles from './styles';

const ButtonShape = {
  title: PropTypes.string.isRequired,
  style: PropTypes.object,
  handler: PropTypes.func,
};

const TitleShape = {
  title: PropTypes.string.isRequired,
  tintColor: PropTypes.string,
};

export default class NavigationBar extends Component {

  getButtonElement(data = {}, style) {
    if (data._isReactElement) {
      return data;
    }

    return <NavbarButton
      title={data.title}
      style={[data.style, style, ]}
      tintColor={data.tintColor}
      handler={data.handler} />;
  }

  getTitleElement(data) {
    if (data._isReactElement) {
      return <View style={styles.customTitle}>{data}</View>;
    }

    const colorStyle = data.tintColor ? { color: data.tintColor, } : null;

    return (
      <Text
        style={[styles.navBarTitleText, colorStyle, ]}>
        {data.title}
      </Text>
    );
  }

  render() {
    const customTintColor = this.props.tintColor ?
      { backgroundColor: this.props.tintColor } : null;

    const statusBar = !this.props.statusBar.hidden ?
      <View style={[styles.statusBar, ]} /> : null;

    return (
      <View style={[styles.navBarContainer, customTintColor, ]}>
        {statusBar}
        <View style={[styles.navBar, this.props.style, ]}>
          {this.getTitleElement(this.props.title)}
          {this.getButtonElement(this.props.leftButton, { marginLeft: 8, })}
          {this.getButtonElement(this.props.rightButton, { marginRight: 8, })}
        </View>
      </View>
    );
  }

  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
    tintColor: PropTypes.string,
    leftButton: PropTypes.oneOfType([
      PropTypes.shape(ButtonShape),
      PropTypes.element,
    ]),
    rightButton: PropTypes.oneOfType([
      PropTypes.shape(ButtonShape),
      PropTypes.element,
    ]),
    title: PropTypes.oneOfType([
      PropTypes.shape(TitleShape),
      PropTypes.element,
    ]),
  }

  static defaultProps = {
    statusBar: {
      style: 'default',
      hidden: false,
      hideAnimation: 'slide',
      showAnimation: 'slide',
    },
    title: {
      title: '',
    },
  }
}
