import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { CHECKOUT_REL, getCheckoutHref, isCheckoutConfigured } from '../data/product'

type CheckoutLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  children: ReactNode
}

/** External checkout CTA. Falls back to Support when checkout URL is still a placeholder. */
export function CheckoutLink({ children, className, ...rest }: CheckoutLinkProps) {
  const configured = isCheckoutConfigured()
  const href = getCheckoutHref()

  return (
    <a
      {...rest}
      href={href}
      className={className}
      {...(configured
        ? { target: '_blank', rel: CHECKOUT_REL }
        : { rel: 'nofollow' })}
      title={
        configured
          ? undefined
          : 'Checkout URL not configured yet — opens Support instead'
      }
    >
      {children}
    </a>
  )
}
