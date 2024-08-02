import image from '../../../assets/pawn_icon.svg';

import styles from './logo.module.scss';

const Logo = ({size}: {size: number}) => {
  return (
    <div className={styles.container}>
      <img src={image} alt="logo" style={{width: `${size}px`}}/>
      Pawn Check
    </div>
  )
};

export default Logo;