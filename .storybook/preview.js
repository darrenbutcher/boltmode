import { Devtools } from "@ui-devtools/tailwind"
import '../styles/tailwind.css'
import './ui-devtools/override.css'
window.UI_DEVTOOLS_API = 'https://app-2406.buildthat.xyz'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  // layout: 'centered',
}

export const decorators = [
  (Story) => (
    <Devtools>
      <div
        className=".flex .items-center .justify-center .h-full" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
        <Story/>
      </div>
    </Devtools>
  )
]
