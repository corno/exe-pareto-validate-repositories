import * as pl from "pareto-core-lib"
import * as pr from "pareto-core-raw"

import * as fs from "res-pareto-filesystem"
import * as us from "res-pareto-ugly-stuff"
import * as proc from "res-pareto-process"


type GithubRepoData = {
    name: string
    archived: boolean
    private: boolean
    clone_url: string
}[]

export function foo(path: string) {
    fs.f_getFile(
        [path, "repos.json"],
        {
            init: ($c) => {
                us.f_JSONParseStream<GithubRepoData>({
                    connectToStream: $c
                })._execute(($) => {
                    pr.wrapRawArray($).forEach(($) => {
                        const foo = $
                        if ($.archived) {
                            pl.logDebugMessage(`REPO ARCHIVED: ${$.name}`)

                            return
                        }
                        pl.logDebugMessage(`REPO: ${$.name}`)
                        //us.

                        // pl.logDebugMessage($.name)
                        // pl.logDebugMessage($.clone_url)
                        // pl.logDebugMessage($.archived ? "**true": "false")
                        // pl.logDebugMessage($.private ? "$$$$true": "false")
                        function x($: string, $c: () => void) {
                            proc.f_call($)._execute(($) => {
                                switch ($[0]) {
                                    case "error": 
                                        pl.cc($[1], ($) => {
                                          pl.logDebugMessage(`${foo.name}: ${$.stderr}`)
                                        })
                                        break
                                        case "success": 
                                            pl.cc($[1], ($) => {
                                                $c()
                                            })
                                            break
                                    default: pl.au($[0])
                                }
                            })
                        }
                        x(`rm -rf '${path}/repos/${$.name}'`, () => {
                            x(`git -C '${path}/repos' clone ${$.clone_url}`, () => {
                                x(`cd '${path}/repos/${$.name}/pareto'`, () => {
                                    // x(`npm install`, () => {
                                    //     x(`./initialize.sh`, () => {
                                    //         x(`cd ../pub`, () => {
                                    //             x(`npm install`, () => {
                                    //                 x(`cd ../test`, () => {
                                    //                     x(`npm install`, () => {
                                    //                         x(`cd ../pareto`, () => {
                                    //                             x(`./scripts/buildAndTest.sh`, () => {
                    
                                    //                             })

                                    //                         })
                                    //                     })
        
                                    //                 })
    
                                    //             })

                                    //         })
                                    //     })
                                    // })
                                })
                            })
                        })
                    })

                })
            },
            onError: ($) => {
                pl.logDebugMessage("ERROR")
            },
            
        },
        ($, $i) => $._execute($i)
    )
}