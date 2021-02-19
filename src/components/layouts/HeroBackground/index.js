/** @jsx jsx */
import { jsx } from 'theme-ui'
import jpegImage from '../../../assets/images/banner.jpg'
import jpegMobile from '../../../assets/images/banner.mobile.jpg'
import webpImage from '../../../assets/images/banner.webp'
import webpMobile from '../../../assets/images/banner.mobile.webp'
import sx from './sx'

const HeroBackground = () => {
  return (
    <div sx={sx.wrapper}>
      <picture sx={sx.picture}>
        <source
          media='(min-width: 841px)'
          srcSet={webpImage}
          type='image/webp'
        />
        <source
          media='(max-width: 840px)'
          srcSet={webpMobile}
          type='image/webp'
        />
        <source
          media='(max-width: 840px)'
          srcSet={jpegMobile}
          type='image/jpg'
        />
        <img
          src={jpegImage}
          alt=''
        />
      </picture>
    </div>
  )
}

export default HeroBackground