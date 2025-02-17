import { ReactNode } from 'react'



interface SocialProps {
    url: string;
    children: ReactNode;
    className?: string;

}



function Social({ url, children }: SocialProps) {
    return (
        <a href={url} rel='noopener noreferrer' target='_blank' className='transition-transform hover:scale-109'>
            {children}
        </a>
    )
}

export default Social