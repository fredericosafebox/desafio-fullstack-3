import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    
    * {
        padding: 0;
        border: 0;
        margin: 0;
        box-sizing: border-box;
        list-style: none;
        outline: none;
        background: none;
        font-family: "Open Sans", sans-serif;
    }

    :root {
        //Extra-Color
        --switch-primary: 247, 37, 133; //#f72585;

        //Grey-Scale
        --grey-1: 248, 249, 250;        //#f8f9fa
        --grey-2: 233, 236, 239;        //#e9ecef
        --grey-3: 173, 181, 189;        //#adb5bd
        --grey-4: 52, 58, 64;           //#343a40
        --grey-5: 33, 37, 41;           //#212529

        //Primary-Color
        --high-primary: 77, 25, 77;     //#4d194d;
        --mid-primary: 0, 100, 102;     //#006466;
        --lower-primary: 33, 47, 69;    //#212f45;
    }

    .app {
        background: rgb(var(--grey-4));
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
        overflow: hidden;

        button {
            padding: 1rem;
            font-size: 1rem;
            cursor: pointer;
            font-weight: 600;
            border-radius: 0.3rem;
        }

        .primaryButton{
            background: rgb(var(--high-primary));
            color: rgb(var(--grey-1));
            flex: 2;
        }
        .secondaryButton{
            background: rgb(var(--mid-primary));
            color: rgb(var(--grey-1));
            flex: 1;
        }
        
        .app__form{
            padding: 1rem;
            background: rgb(var(--grey-2));
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
            min-width: 20rem;
            width: 90%;
            min-height: 15rem;
            border-radius: 0.4rem;
            box-shadow: 6px 8px 4px 0 rgb(var(--grey-5));

            h1 {
                font-size: 2rem;
                color: rgb(var(--high-primary));
            }

            .app__form--contentWrapper {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                align-items: center;
            
                
                label {
                    font-size: 0.9rem;
                    font-weight: 600;
                    width: 100%;
                    transition: 0.5s;
                }
               
                input {
                    border: 2px solid rgb(var(--high-primary));
                    border-radius: 0.3rem;
                    padding: 0.8rem 0.5rem ;
                    transition: 0.5s;
                    font-size: 1rem;
                    width: 100%;

                    &:focus {
                        box-shadow: inset 0 0 3px 0 rgb(var(--high-primary));
                        background: rgba(var(--high-primary), 0.1);
                    }
                }

                
            }
            .app__form--buttonWrapper {
                display: flex;
                gap: 0.5rem;
                justify-content: center;
                align-items: center;
            }

            .form__errors{
                color: rgb(255,10,20);
                font-weight: 600;
                font-size: 0.8rem;
                width: 100%;
                padding: 0 0.2rem;
           
            }
            


    
        }
    }

    


`;
