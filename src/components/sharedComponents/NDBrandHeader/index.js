/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { jsx, Box, Button, Heading } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import ClickableNDLogoWhite from '../ClickableNDLogoWhite'
import NDBrandNavSearch from './NDBrandNavSearch'
import Menu from '@ndlib/gatsby-theme-marble/src/components/Shared/Menu'
import typy from 'typy'

export const query = graphql`
query {
  site {
    siteMetadata {
      title
      subTitle
      description
      author
    }
  }
    menusJson(id: {eq: "header"}) {
      id
      label
      items {
        id
        label
        link
        icon
        selectedPatterns
      }
    }
  }
`

export const NDBrandHeader = ({ location, ...props }) => {
  const { site, menusJson } = useStaticQuery(query)
  const menu = typy(menusJson, 'items').safeArray

  const [showSearch, setShowSearch] = useState(false)

  return (
    <Box as='header' sx={{
      gridRow: 'header',
      padding: '2.5rem 0 0',
      display: 'grid',
      gridTemplateColumns: '[screen-start] 5vw [container-start title-start] 1fr [title-end mark-start] 200px [mark-end container-end] 5vw [screen-end]',
      gridTemplateRows: '[title-start] auto [title-end nav-header-start] auto [nav-header-end nav-mobile-start] auto [nav-mobile-end]',
      textAlign: 'left',
      borderTopWidth: '5px',
      borderTopColor: 'secondary',
      borderTopStyle: 'solid',
      backgroundColor: 'primary',
      borderBottomWidth: '5px',
      borderBottomColor: 'dark',
      borderBottomStyle: 'solid',
      opacity: '.9',
      zIndex: 1,
    }}>
      <div sx={{
        gridRow: 'title',
        gridColumn: 'mark',
        justifySelf: 'right',
      }}>
        <ClickableNDLogoWhite />
      </div>
      <div sx={{
        gridRow: 'title',
        gridColumn: 'title',
        alignSelf: 'flex-start',
      }}>
        <Heading as='h1' sx={{
          color: 'gray.1',
          m: 0,
          p: 0,
          fontFamily: 'title',
          fontSize: '8',
        }}>{site.siteMetadata.title}</Heading>
        <p sx={{
          color: 'white',
          my: 0,
          py: 0,
          marginLeft: '120px',
          fontFamily: 'serif',
          fontSize: '2',
          top: '-13px',
          position: 'relative',
        }}>{site.siteMetadata.subTitle}</p>
      </div>
      <div sx={{ gridRow: 'nav-header', gridColumn: 'container' }}>
        {showSearch ? (
          <NDBrandNavSearch location={location} searchPath='search' setShowSearch={setShowSearch} />
        ) : (
          <Menu variant='header' items={menu} location={location}>
            <Button sx={{
              borderRadius: '0',
              borderLeftWidth: '1px',
              borderLeftStyle: 'solid',
              borderLeftColor: 'gray.4',
            }} onClick={() => setShowSearch(true)} title='show search'>
              <svg className='icon' data-icon='search' width='16' height='16'>
                <use xlinkFref='#icon-search' />
                <svg id='icon-search' viewBox='0 0 512 512'>
                  <path d='M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z' />
                </svg>
              </svg>
            </Button>
          </Menu>
        )}
      </div>
    </Box>
  )
}

NDBrandHeader.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  image: PropTypes.object,
}

NDBrandHeader.defaultProps = {
  variant: 'default',
}

export default NDBrandHeader