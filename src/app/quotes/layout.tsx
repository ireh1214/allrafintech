import { PropsWithChildren } from 'react'
import { Metadata } from 'next'
import Header from "./components/quote-header";

export const metadata: Metadata = {
  title: '올라 위즈덤',
  description: '올라 과제 전형 - 위즈덤',
}

export default function QuotesLayout({ children }: PropsWithChildren<{}>) {

  return (
    <div>
    <Header />
      <main className={'mt-32'}>{children}</main>
    </div>
  )
}
