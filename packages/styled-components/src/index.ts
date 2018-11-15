import styled, { StyledComponent } from 'styled-components'

interface SubdivisionOptions {
  gutter?: number
  gutterH: number
  gutterV: number
  containerSelector: string
  columnSelector: string
}

const defaults: SubdivisionOptions = {
  gutterH: 10,
  gutterV: 10,
  containerSelector: '.grid',
  columnSelector: '*'
}

const percentage = (d: number) => `${(d * 100).toFixed()}%`

export default class Subdivision {
  gutterH: number = defaults.gutterH
  gutterV: number = defaults.gutterV
  containerSelector: string = defaults.containerSelector
  columnSelector: string = defaults.columnSelector

  Grid: StyledComponent<any, any, any, any>

  get gutter(): number {
    return this.gutterH
  }

  constructor(options: Partial<SubdivisionOptions> = {}) {
    // is global gutter given?
    if (options.gutter) {
      options.gutterH = options.gutter
      options.gutterV = options.gutter
      delete options.gutter
    }

    Object.assign(this, options)

    this.Grid = styled.div.attrs({ className: this.containerSelector.substring(1) })`
      ${this.columns()}
    `
  }

  column = (
    fraction: number = 1,
    offset: number = 0,
    gutterLeft: number = this.gutterH,
    gutterRight: number = this.gutterH,
    center: boolean = false
  ): string => {
    const gutterWidth = gutterLeft + gutterRight - this.gutterH

    return `
      flex-basis: calc(${percentage(fraction)} - ${gutterWidth}px);
      max-width: calc(${percentage(fraction)} - ${gutterWidth}px);
  
      margin-right: ${gutterRight - this.gutterH}px;
      margin-left: ${gutterLeft}px;
  
      ${
        center
          ? `
            margin-left: ${this.getOffset((1 - fraction) / 2)};
            margin-right: ${this.getOffset((1 - fraction) / 2)};
          `
          : this.offset(offset, gutterLeft)
      }
    `
  }

  offset = (offset: number = 0, gutter: number = this.gutterH): string => {
    return offset !== 0 ? `margin-left: ${this.getOffset(offset, gutter)};` : ''
  }

  stack = (): string => {
    return `
      flex-basis: 100%;
      max-width: 100%;
      margin-left: ${this.gutterH}px;
    `
  }

  fullBleed = (): string => {
    return `
      flex-basis: 100%;
      max-width: auto;
      margin-left: -${this.gutterH}px;
      margin-right: -${this.gutterH}px;
    `
  }

  center = (fraction: number): string => {
    return `
      max-width: calc((100% - ${this.gutterH}px) * ${fraction} - ${
      this.gutterH
    }px);
      margin: 0 auto;
    `
  }

  uncenter = (): string => {
    return `
      max-width: none;
      margin: 0;
    `
  }

  rows = (): string => {
    return `
      display: block;
      box-sizing: border-box;
    
      margin-left: -${this.gutterH}px;
      margin-right: -${this.gutterH}px;
      padding-right: ${this.gutterH}px;
    
      > ${this.columnSelector} {
        box-sizing: border-box;
        
        margin-left: ${this.gutterH}px;
        margin-bottom: ${this.gutterH}px;
      }
    `
  }

  columns = (): string => {
    return `
      display: flex;
      flex-wrap: wrap;
      box-sizing: border-box;
    
      margin-left: -${this.gutterH}px;
      margin-right: -${this.gutterH}px;
      padding-right: ${this.gutterH}px;
      
      > ${this.columnSelector} {
        flex: 1 1 0%;
        box-sizing: border-box;
    
        margin-left: ${this.gutterH}px;
        margin-bottom: ${this.gutterV}px;
    
        > ${this.containerSelector} {
          margin-bottom: -${this.gutterV}px;
        }
      }
    `
  }

  private getOffset(offset: number, gutter: number = this.gutterH): string {
    return `calc(${percentage(offset)} + ${gutter}px);`
  }
}
