#!/usr/bin/env node

const { spawnSync } = require('child_process');
const path = require('path');
const { listAvailableLanguages } = require('./lib/install-executor');
const { getComputeSponsorCopy } = require('./lib/compute-sponsor');
const { createSafeItoInvocationEnvironment, getInvocationCommand } = require('./lib/ito-environment');

const COMMANDS = {
  setup: {
    script: 'setup.js',
    description: 'Install or update the Gemini plugin with guided scope and hook choices',
  },
  welcome: {
    script: 'welcome.js',
    description: 'Show the EGC welcome artwork and community links',
  },
  install: {
    script: 'install-apply.js',
    description: 'Install EGC content, including the guided multi-harness wizard',
  },
  plan: {
    script: 'install-plan.js',
    description: 'Inspect selective-install manifests and resolved plans',
  },
  catalog: {
    script: 'catalog.js',
    description: 'Discover install profiles and component IDs',
  },
  consult: {
    script: 'consult.js',
    description: 'Recommend EGC components and profiles from a natural language query',
  },
  'control-pane': {
    script: 'control-pane.js',
    description: 'Run the local EGC2 operator control pane',
  },
  ito: {
    script: 'ito.js',
    description: 'Invoke the separately installed canonical Itô compute CLI',
  },
  nasiko: {
    script: 'nasiko.js',
    description: 'Install or inspect the optional pinned Nasiko CLI lifecycle bridge',
  },
  memory: {
    script: 'memory.js',
    description: 'Share durable context across Gemini, Codex, Hermes, and other harnesses',
  },
  'install-plan': {
    script: 'install-plan.js',
    description: 'Alias for plan',
  },
  'list-installed': {
    script: 'list-installed.js',
    description: 'Inspect install-state files for the current context',
  },
  doctor: {
    script: 'doctor.js',
    description: 'Diagnose missing or drifted EGC-managed files',
  },
  feedback: {
    script: 'feedback.js',
    description: 'Open the shortest path to report a problem, feedback, or an idea',
  },
  repair: {
    script: 'repair.js',
    description: 'Restore drifted or missing EGC-managed files',
  },
  'auto-update': {
    script: 'auto-update.js',
    description: 'Pull latest EGC changes and reinstall the current managed targets',
  },
  status: {
    script: 'status.js',
    description: 'Query the EGC SQLite state store status summary',
  },
  'platform-audit': {
    script: 'platform-audit.js',
    description: 'Audit GitHub queues, discussions, roadmap, release, and security evidence',
  },
  'security-ioc-scan': {
    script: 'ci/scan-supply-chain-iocs.js',
    description: 'Scan dependency and AI-tool persistence surfaces for active supply-chain IOCs',
  },
  sessions: {
    script: 'sessions-cli.js',
    description: 'List or inspect EGC sessions from the SQLite state store',
  },
  'work-items': {
    script: 'work-items.js',
    description: 'Track linked Linear, GitHub, handoff, and manual work items',
  },
  'session-inspect': {
    script: 'session-inspect.js',
    description: 'Emit canonical EGC session snapshots from dmux or Gemini history targets',
  },
  'loop-status': {
    script: 'loop-status.js',
    description: 'Inspect Gemini transcripts for stale loop wakeups and pending tool results',
  },
  uninstall: {
    script: 'uninstall.js',
    description: 'Remove EGC-managed files recorded in install-state',
  },
};

const PRIMARY_COMMANDS = [
  'setup',
  'welcome',
  'install',
  'plan',
  'catalog',
  'consult',
  'control-pane',
  'ito',
  'nasiko',
  'memory',
  'list-installed',
  'doctor',
  'feedback',
  'repair',
  'auto-update',
  'status',
  'platform-audit',
  'security-ioc-scan',
  'sessions',
  'work-items',
  'session-inspect',
  'loop-status',
  'uninstall',
];

function showHelp(exitCode = 0) {
  process.stdout.write(`
EGC selective-install CLI

Usage:
  ecc <command> [args...]
  ecc [install args...]
  ecc --dry-run <command> [args...]

Commands:
${PRIMARY_COMMANDS.map(command => `  ${command.padEnd(15)} ${COMMANDS[command].description}`).join('\n')}

Compatibility:
  ecc-install        Legacy install entrypoint retained for existing flows
  ecc [args...]      Without a command, args are routed to "install"
  ecc help <command> Show help for a specific command

Global Flags:
  --dry-run          Preview actions without executing (sets EGC_DRY_RUN=1)

Compute:
  ${getComputeSponsorCopy()}

Examples:
  egc setup
  egc setup --mode gemini-plugin --scope user --hooks standard --yes
  egc welcome
  egc install --guided
  egc install --guided --harness gemini --harness codex --harness kimi
  ecc typescript
  egc install --profile developer --target gemini
  egc plan --profile core --target cursor
  egc catalog profiles
  egc catalog components --family language
  egc catalog show framework:nextjs
  egc consult "security reviews"
  egc control-pane --port 8765
  egc ito login [--no-browser]
  egc ito logout
  egc ito auth
  egc ito find --gpu h200 --count 8 --nodes 1 --gpus-per-node 8 --days 30 --storage-tb 1 --start-window 2099-08-15 --max-rate 3.00 --form-factor bare_metal --contract-type reservation --fabric infiniband --region us-east-1
  egc ito status --json
  egc nasiko status --json
  egc nasiko install --version v0.1.0 --dry-run --json
  egc nasiko install --version v0.1.0 --yes --json
  egc ito evals --cluster clu_prod_example --live-sixtytwo --nodes gpu-01,gpu-02 --config-dir /absolute/path/to/qualification-config
  egc memory init
  egc memory handoff --from codex --target gemini --title "Continue migration" --stdin
  egc memory search "migration blockers" --target-harness hermes
  egc list-installed --json
  egc doctor --target cursor
  egc feedback
  egc repair --dry-run
  egc auto-update --dry-run
  egc status --json
  egc status --exit-code
  egc status --markdown --write status.md
  egc platform-audit --json --allow-untracked docs/drafts/
  egc security-ioc-scan --home
  egc sessions
  egc sessions session-active --json
  egc work-items upsert linear-ecc-20 --source linear --source-id EGC-20 --title "Review control-plane contract" --status blocked
  egc work-items sync-github --repo stephenpaul2509c-ship-it/everything-gemini-code
  egc session-inspect gemini:latest
  egc loop-status --json
  egc uninstall --target antigravity --dry-run
`);

  process.exit(exitCode);
}

function resolveCommand(argv) {
  const args = argv.slice(2);

  if (args.length === 0) {
    return { mode: 'help' };
  }

  if (args.includes('--dry-run')) {
    process.env.EGC_DRY_RUN = '1';
  }

  let cmdStart = 0;
  while (cmdStart < args.length && args[cmdStart] === '--dry-run') {
    cmdStart++;
  }

  if (cmdStart >= args.length) {
    return { mode: 'help' };
  }

  const firstArg = args[cmdStart];
  const restArgs = args.slice(cmdStart + 1);

  if (firstArg === '--help' || firstArg === '-h') {
    return { mode: 'help' };
  }

  if (firstArg === 'help') {
    return {
      mode: 'help-command',
      command: restArgs[0] || null,
    };
  }

  if (COMMANDS[firstArg]) {
    return {
      mode: 'command',
      command: firstArg,
      args: restArgs,
    };
  }

  const knownLegacyLanguages = listAvailableLanguages();
  const shouldTreatAsImplicitInstall = (
    firstArg.startsWith('-')
    || knownLegacyLanguages.includes(firstArg)
  );

  if (!shouldTreatAsImplicitInstall) {
    throw new Error(`Unknown command: ${firstArg}`);
  }

  return {
    mode: 'command',
    command: 'install',
    args,
  };
}

function runCommand(commandName, args) {
  const command = COMMANDS[commandName];
  if (!command) {
    throw new Error(`Unknown command: ${commandName}`);
  }
  const isItoLogin = commandName === 'ito' && getInvocationCommand(args) === 'login';
  const result = spawnSync(
    process.execPath,
    [path.join(__dirname, command.script), ...args],
    {
      cwd: process.cwd(),
      env: commandName === 'ito'
        ? {
          ...createSafeItoInvocationEnvironment(process.env, args, {
            includeControls: true,
          }),
        }
        : process.env,
      stdio: isItoLogin || commandName === 'setup' || commandName === 'install'
        ? 'inherit'
        : commandName === 'memory'
          ? ['inherit', 'pipe', 'pipe']
          : ['pipe', 'pipe', 'pipe'],
      encoding: 'utf8',
      maxBuffer: 10 * 1024 * 1024,
    }
  );

  if (result.error) {
    throw result.error;
  }

  if (result.stdout) {
    process.stdout.write(result.stdout);
  }

  if (result.stderr) {
    process.stderr.write(result.stderr);
  }

  if (typeof result.status === 'number') {
    return result.status;
  }

  if (result.signal) {
    throw new Error(`Command "${commandName}" terminated by signal ${result.signal}`);
  }

  return 1;
}

function main() {
  try {
    const resolution = resolveCommand(process.argv);

    if (resolution.mode === 'help') {
      showHelp(0);
    }

    if (resolution.mode === 'help-command') {
      if (!resolution.command) {
        showHelp(0);
      }

      if (!COMMANDS[resolution.command]) {
        throw new Error(`Unknown command: ${resolution.command}`);
      }

      process.exitCode = runCommand(resolution.command, ['--help']);
      return;
    }

    process.exitCode = runCommand(resolution.command, resolution.args);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

main();
