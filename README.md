# Фронтенд Code Style. Критерии
<img src="title-flex.jpg" width="70px" title="Title-flex">&nbsp;<img src="title-flex.jpg" width="70px" title="Title-flex">&nbsp;<img src="title-flex.jpg" width="70px" title="Title-flex">

#### Содержание
[Нейминг](#naming)  
[Стили](#styles)  
[React](#react)  
[Next](#naming)

<a name="naming"><h2>Нейминг</h2></a>

:page_with_curl: H1. Названия и содержание компоненты
```
- Component/
--- Component.tsx
--- Component.module.scss
--- index.ts
```

:page_with_curl: Н1. Название переменных, параметров, свойств и методов записываются в нотации camelCase.

:page_with_curl: Н2. Названия констант (постоянных значений) записываются в нотации UPPER_SNAKE_CASE:
```jsx
const MAX_HEIGHT = 400;
const DEFAULT_TIME = 1000;
```

:page_with_curl: Н3. Массивы названы существительными во множественном числе:
```jsx
const frameworks = ['Next', 'Vue', 'JQuery'];
const evenNumbers = [2, 10, 44];
```

:page_with_curl: Н4. Название функции должно быть глаголом и соответствовать действию, которое она выполняет:
```jsx
const getRandomNumber = () => Math.random();
const printNames = (names) => {
  names.forEach((name) => {
    console.log(name);
  });
};
const handleClick = () => console.log('clicked') 
```

:page_with_curl: Н5. Сокращённые названия переменных можно использовать, только если такое название широко распространено. Допустимые сокращения:
- `evt` или `e` для объектов Event и его производных (MouseEvent, KeyboardEvent и подобные)
- `i`, `j`, `k`, `l`, `t` для счётчика в цикле
- `cb` для единственного колбэка в параметрах функции
- `btn` для `button`

<a name="styles"><h2>Стили</h2></a>

:page_with_curl: C1. В названиях классов использованы английские слова и термины. Отсутствует транслит и сокращения. Названия классов понятны и должны кратко описывать её предназначение. Популярные названия:
```scss
/*--- Блоки ---*/
.block, .section, .sidebar, .content, .section, .card {}

/*--- Обёртки ---*/
.wrapper, .innerWrapper, .container, .innerContainer {}

/*--- Текст---*/
.caption, .title, .subtitle, .text, .tag, .slogan, .lead, .description, .copyright {}

/*--- Списки ---*/
.list, .item {}

/*--- Элементы управления ---*/
.popup, .pagination, .modal, .tooltip, .breadcrumbs {}
```

:page_with_curl: C2. Стили текста задаются один раз в `body`, и они автоматом применятся ко всем элементам:
```scss
body {
  background: url("images/cat.jpg");
  margin-bottom: 0;
  font-size: 14px;
}
```

:page_with_curl: С2. Перед открывающейся фигурной скобкой стоит пробел. После скобки запись идёт с новой строки. Во всех случаях в стилях использованы двойные кавычки:
<table>
  <tr>
    <td>:white_check_mark: GOOD</td>
    <td>:x: BAD</td>
  </tr>
  <tr>
    <td>

```scss
.block {
  background: url("images/cat.jpg");
  margin-bottom: 0;
  font-size: 14px;
}

.title {
  font-size: 10px;
}
```
</td>
<td>

```scss
.block {
  background-image: url('images/cat.jpg');
  margin-bottom: 0;
  font-size: 14px;
}
.title {
  font-size: 10px;
}

```
</td>
</tr>
</table>

:page_with_curl: С2. Ключевое слово `!important` не использовано для борьбы со специфичностью. Допустимо для переопределения библиотек.

:page_with_curl: С2. Для свойств, чьи величины измеряются в px, использовать миксин `fluid`. Миксины записываются первыми в списке стилей.
```scss
.wrapper {
  @include fluid(gap, 26px, 30px);
  @include fluid(margin-top, 60px, 80px);
  @include fluid(margin-bottom, 60px, 80px);
  display: flex;
  justify-content: center;
}
```

:page_with_curl: С3. Медиа запросы располагаются внутри селектора.
```scss
.block {
  gap: 10px;
  
  @media (max-width: 1440px) {
    gap: 30px;
  }
}
```

<a name="react"><h2>React</h2></a>

:page_with_curl: Р1. Структура каждого TSX-файла:
- Импорты
- Описание типа компонента (props)
- Код компонента
- Экспорты

:page_with_curl: Р2. Порядок написания кода компоненты: *стейты &rarr; store &rarr; api-запросы &rarr; остальная логика &rarr; содержимое компоненты*
```jsx
// Стейты
const [open, setOpen] = useState(false);
const [isVisible, setIsVisible] = useState(true);

// Store
const {name, setName} = useStore();

// API
const {mutate, isLoading} = useMutation(phoneCheckFetcher);
const {data} = useRegions();
const {data: dataProfile, isSuccess: isSuccessProfile} = useProfile();

// Остальная логика
// ...

// Содержимое компоненты
return (<MyComponent><MyComponent/>);
```

:page_with_curl: Р6. В компонентах отсутствует прямое обращение к DOM-элементам (например, document.querySelector). Если требуется получить доступ к DOM-элементу, применяются ссылки (ref).

:page_with_curl: P6. В каждой папке - используется index.ts файлы, который экспортирует нужный файл наружу

```tsx
// index.ts

export {Component} from './Component'
```
Это нам дает сокращенные ссылки при импорте компоненты из вне

<table>
  <tr>
    <td>:white_check_mark: GOOD</td>
  </tr>
  <tr>
    <td>

```tsx
// modules/Landing.tsx

import {Component} from './components'
```

</td>

</tr>
</table>
<table>
  <tr>
    <td>:x: BAD</td>
  </tr>
  <tr>
    <td>

```tsx
// modules/Landing.tsx

import {Component} from './components/Component/Component'
```

</td>

</tr>
</table>


:page_with_curl: P7. Использование шаблонных строк или тернарных операторов для указания нескольких модульных классов запрещено (или классов по условию). Вместо этого использовать библиотеку `clsx`.

<table>
  <tr>
    <td>:white_check_mark: GOOD</td>
  </tr>
  <tr>
    <td>

```tsx
// Отдельно вынесенные классы
const buttonClasses = clsx(s.button, {
  [s.isGreen]: isGreen,
  [s.isLoading]: isLoading,
  [s.isDisabled]: isDisabled
});

// Сразу в className
<button className={clsx(s.button, {[s.buttonActive]: active})}></button>

// С одним условием
<div className={clsx({[s.active]: count === 10})}></div>
```
</td>

</tr>
</table>
<table>
  <tr>
    <td>:x: BAD</td>
  </tr>
  <tr>
    <td>

```tsx
<Link className={props.white ? `${s.headerLogo} ${s.white}` : `${s.headerLogo}`}></Link>
```
</td>

</tr>
</table>
