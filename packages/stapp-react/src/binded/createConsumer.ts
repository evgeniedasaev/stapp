import shallowEqual from 'fbjs/lib/shallowEqual'
import { Component, ComponentClass, createElement } from 'react'
import { identity } from 'stapp/lib/helpers/identity/identity'
import { consumerPropTypes } from '../helpers/propTypes'

// Models
import { Stapp } from 'stapp'
import { renderComponent } from '../helpers/renderComponent'
import { ConsumerProps } from '../models/Props'
import { Subscription } from '../subscription/subscription'

export const createConsumer = <State, Api>(
  app: Stapp<State, Api>,
  name: string = 'Stapp'
): ComponentClass<ConsumerProps<State, Api, any>> => {
  return class Consumer extends Component<ConsumerProps<State, Api, any>> {
    static displayName = `${name}.Consumer`
    static propTypes = consumerPropTypes
    static defaultProps = {
      map: identity
    }

    memo: ReturnType<typeof renderComponent> | null = null
    prevState: any = null

    render() {
      return createElement(Subscription, {
        source: app,
        children: (state: any) => {
          const nextState = this.props.map!(state, app.api)

          if (!shallowEqual(this.prevState, nextState)) {
            this.prevState = nextState
            return (this.memo = renderComponent({
              name: 'Consumer',
              renderProps: this.props,
              result: nextState,
              api: app.api,
              app
            }))
          }

          return this.memo
        }
      })
    }
  }
}
