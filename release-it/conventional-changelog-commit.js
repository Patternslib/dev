// The preset adds the list marker and indents continuation lines.
module.exports = function commitPartial(context, commit) {
    const repoUrl = context.repository
        ? [context.host, context.owner, context.repository].filter(Boolean).join("/")
        : context.repoUrl;
    const summary = [
        commit.scope && `**${commit.scope}:**`,
        commit.subject || commit.header,
        commit.hash &&
            (context.linkReferences
                ? `([${commit.shortHash}](${repoUrl}/${context.commit}/${commit.hash}))`
                : commit.hash),
    ]
        .filter(Boolean)
        .join(" ");

    const references = (commit.references || []).map((reference) => {
        const label = `${reference.owner ? `${reference.owner}/` : ""}${reference.repository || ""}#${reference.issue}`;
        if (!context.linkReferences) {
            return label;
        }

        const referenceUrl = context.repository
            ? [
                  context.host,
                  reference.repository
                      ? reference.owner || context.owner
                      : context.owner,
                  reference.repository || context.repository,
              ]
                  .filter(Boolean)
                  .join("/")
            : context.repoUrl;
        return `[${label}](${referenceUrl}/${context.issue}/${reference.issue})`;
    });

    return [
        summary,
        commit.body,
        commit.footer,
        references.length && `closes ${references.join(" ")}`,
    ]
        .filter(Boolean)
        .join("\n\n");
};
