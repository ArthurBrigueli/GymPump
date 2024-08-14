import {BannerAd, TestIds, BannerAdSize} from 'react-native-google-mobile-ads'


const BannerAds = ()=>{


    const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-3363226248593249/3190830306';

    return(
        <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.FULL_BANNER}
            requestOptions={{
                requestNonPersonalizedAdsOnly: true,
            }}
        />
    )
}


export default BannerAds