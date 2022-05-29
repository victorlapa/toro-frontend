import React from "react";

import * as styled from './styles'

import Logo from '../../assets/toro-logo.svg'

export default function Header() {
  return(
    <styled.Container>
      <img src={Logo} alt='Logo Toro' />;
    </styled.Container>
  )
}
