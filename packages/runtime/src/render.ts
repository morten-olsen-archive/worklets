import { WorkletRenderApi } from '@morten-olsen/worklet-sdk';
import EventEmitter from 'eventemitter3';

type HtmlType = {
  id: string;
  type: 'html';
  content: string;
};

type UrlType = {
  id: string;
  type: 'url';
  url: string;
};

type ElementType = {
  id: string;
  type: 'element';
  element: React.ReactNode;
};

type RenderType = HtmlType | UrlType | ElementType;

type RenderEvents = {
  render: (type: RenderType) => void;
};

let renderId = 0;

class RenderApi extends EventEmitter<RenderEvents> implements WorkletRenderApi {
  #renders: RenderType[] = [];

  public get renders() {
    return this.#renders;
  }

  public html = async (content: string) => {
    const render: RenderType = { id: `render-${renderId++}`, type: 'html', content };
    this.#renders.push(render);
    this.emit('render', render);
  };

  public url = async (url: string) => {
    const render: RenderType = { id: `render-${renderId++}`, type: 'url', url };
    this.#renders.push(render);
    this.emit('render', render);
  };

  public element = async (element: React.ReactNode) => {
    const render: RenderType = { id: `render-${renderId++}`, type: 'element', element };
    this.#renders.push(render);
    this.emit('render', render);
  };
}

export type { RenderType, RenderEvents };
export default RenderApi;
