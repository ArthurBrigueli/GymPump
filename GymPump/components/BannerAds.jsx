import {BannerAd, TestIds} from 'react-native-google-mobile-ads'


const BannerAd = ()=>{
    return(
        <BannerAd
            unitId={TestIds}
            size={BannerAdSize.FULL_BANNER}
            requestOptions={{
                requestNonPersonalizedAdsOnly: true,
            }}
        />
    )
}


export default BannerAd