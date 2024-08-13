import { ImgHTMLAttributes } from 'react';
import styles from '../components/Avatar.module.css';


interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement>{
    hasBorder?: boolean;
}


export function Avatar({hasBorder = true, ...props}: AvatarProps){ // definimos atraves da desestruturaçao que o harBorder terá o valor de true como padrão para puxar a borda no avatar. Outra questao é o REST OPERATOR
    console.log(props)

    return(
        <img 
            className={hasBorder ? styles.avatarWithBorder :  styles.avatar}  // se hasBorder for True, então irá puxar o estilo avatarWithBorder do arquivo de estilo, se não irá puxar o avatar normal
            {...props}
            // src={src}
            // alt={alt}
            // title={title}
            // onClick={onClick}
        />
    )
}