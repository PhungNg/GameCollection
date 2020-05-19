<script>
    import Fa from 'svelte-fa'
    import { faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons'
    export let gameInfo
    let lessRecommended
    const showHideText = (e) => {
        let target = e.srcElement.classList
        if(target.contains('showFullBox')){
            target.remove('showFullBox')
        }else{
            target.add('showFullBox')
        }
    }
</script>

<div>
    <h4 style="padding-top: 1rem" class="textShadow">Requierments</h4>
    {#each gameInfo.platforms as requirement}
            {#if requirement.requirements != null}<!-- kjør requierments finnes -->
            <div class="bottomBorder">
                <div style="padding: 1rem 0 .5rem 0">
                    <h3>System requierments for {requirement.platform.name}</h3>
                </div>
                {#if requirement.requirements.minimum}<!-- Ser etter minimum requierments -->
                    <div on:click={e=>showHideText(e)} class="reguireBox pointer">
                        <div class="plusIcon textShadow">
                                <Fa icon={faPlusSquare} size="1.2x"/>
                                <!-- <Fa icon={faMinusSquare} size="1.2x"/> -->
                        </div>
                        <div class="textShadow">
                            {@html requirement.requirements.minimum}
                        </div>
                    </div>
                {/if}
                {#if requirement.requirements.recommended}<!-- Ser etter recommended requierments -->
                    <div on:click={e=>showHideText(e)} class="reguireBox pointer {lessRecommended}">
                        <div class="plusIcon textShadow">
                            <Fa icon={faPlusSquare} size="1.2x"/>
                        </div>
                        <div class="textShadow">
                            {@html requirement.requirements.recommended}
                        </div>
                    </div>
                {/if}
            </div>
        {/if}
    {/each}
</div>

<style>
.reguireBox{
    height: 30px;
    display: flex;
    overflow: hidden;
}
.showFullBox{
    height: 100%;
}
</style>