import React, {useEffect, useRef, useState} from 'react';
// import PropTypes from 'prop-types';
import {Wrapper} from '@googlemaps/react-wrapper';
import {isLatLngLiteral} from '@googlemaps/typescript-guards';
import {createCustomEqual} from 'fast-equals';

// See https://github.com/googlemaps/js-samples/blob/2971c40045eed60a74be5f716ccf2254119b63d8/dist/samples/react-map/docs/index.jsx#L128-L134.
/**
 *
 * @param {GoogleMapsWrapper.propTypes} props
 * @return {JSX.Element}
 * @constructor
 */
function GoogleMapsWrapper(props) {
  const GOOGLE_MAPS_API_KEY_FOR_DEV = 'AIzaSyDVibZi-zjyeE3sc3mLNv1IciSbMAs9Sn4';

  const render = (status) => {
    return <h1>{status}</h1>;
  };

  // eslint-disable-next-line react/prop-types
  const Map = ({onClick, onIdle, children, style, ...options}) => {
    const ref = useRef(null);
    const [map, setMap] = useState();

    useEffect(() => {
      if (ref.current && !map) {
        console.log('GoogleMapsWrapper: Map instantiated: ', ref);
        setMap(new window.google.maps.Map(ref.current, {}));
      }
    }, [ref, map]);

    useEffect(() => {
      if (map) {
        ['click', 'idle'].forEach((eventName) =>
          google.maps.event.clearListeners(map, eventName),
        );
        if (onClick) {
          map.addListener('click', onClick);
        }

        if (onIdle) {
          map.addListener('idle', () => onIdle(map));
        }
      }
    }, [map, onClick, onIdle]);

    // Because React does not do deep comparisons, a custom hook is used.
    // See discussion in https://github.com/googlemaps/js-samples/issues/946.
    useDeepCompareEffectForMaps(() => {
      if (map) {
        map.setOptions(options);
      }
    }, [map, options]);

    return (
      <>
        <div ref={ref} style={style}/>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            // Set the map prop on the child component.
            return React.cloneElement(child, {map});
          }
        })}
      </>
    );
  };

  const Marker = (options) => {
    const [marker, setMarker] = useState();

    useEffect(() => {
      if (!marker) {
        setMarker(new google.maps.Marker());
        console.log('GoogleMapsWrapper: Marker instantiated: ', marker);
      }

      // remove marker from map on unmount
      return () => {
        if (marker) {
          marker.setMap(null);
        }
      };
    }, [marker]);

    useEffect(() => {
      if (marker) {
        marker.setOptions(options);
      }
    }, [marker, options]);
    return null;
  };

  const useDeepCompareMemoize = (value) => {
    const ref = useRef();

    if (!deepCompareEqualsForMaps(value, ref.current)) {
      ref.current = value;
    }
    return ref.current;
  };

  const useDeepCompareEffectForMaps = (callback, dependencies) => {
    useEffect(callback, dependencies.map(useDeepCompareMemoize));
  };

  const deepCompareEqualsForMaps = createCustomEqual((deepEqual) => (a, b) => {
    if (
      isLatLngLiteral(a) ||
      a instanceof google.maps.LatLng ||
      isLatLngLiteral(b) ||
      b instanceof google.maps.LatLng
    ) {
      return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
    }
    return deepEqual(a, b);
  });

  const [clicks, setClicks] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [zoom, setZoom] = useState(3); // initial zoom
  // eslint-disable-next-line no-unused-vars
  const [center, setCenter] = useState({
    lat: 0,
    lng: 0,
  });

  const onClick = (e) => {
    setClicks([...clicks, e.latLng]);
  };

  const onIdle = (m) => {
    setZoom(m.getZoom());
    setCenter(m.getCenter().toJSON());
  };

  return (
    <Wrapper apiKey={GOOGLE_MAPS_API_KEY_FOR_DEV} render={render}>
      <Map
        center={center}
        onClick={onClick}
        onIdle={onIdle}
        zoom={zoom}
        style={{flexGrow: '1', height: '100%'}} // TODO: Should not be 100%.
      >
        {clicks.map((latLng, i) => (
          <Marker key={i} position={latLng} />
        ))}
      </Map>
    </Wrapper>
  );
}

GoogleMapsWrapper.propTypes = {};

export default GoogleMapsWrapper;
