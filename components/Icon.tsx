import cn from 'classnames'
import SVG from 'react-inlinesvg'

import { IconName, IconColor } from '@/utils/types'

type Props = {
  color?: IconColor
  name: IconName
  size?: 'sm' | 'default' | 'lg'
}

const Icon: React.FC<Props> = ({ color = 'currentColor', name, size = 'default' }) => {
  const style = {
    size: {
      sm: '16px',
      default: '20px',
      lg: '24px'
    }[size],
    color: {
      currentColor: 'currentColor',
      red: 'text-red',
      orange: 'text-orange',
      yellow: 'text-yellow',
      green: 'text-green',
      blue: 'text-blue',
      purple: 'text-purple'
    }[color]
  }

  return (
    <SVG
      src={`/images/icons/${name}.svg`}
      width={style.size}
      height={style.size}
      className={cn(`flex-shrink-0`, style.color)}
      aria-hidden='true'
      role='img'
    />
  )
}

export default Icon
